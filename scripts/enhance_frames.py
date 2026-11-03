import os
import shutil
import time
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageFilter, ImageEnhance

SRC_DIR = 'public/frames'
BACKUP_DIR = 'public/frames_lowres_backup'
ROOT_FRAMES_DIR = 'frames'
TOTAL_FRAMES = 120

def backup_originals():
    if not os.path.exists(BACKUP_DIR):
        print(f"Creating backup of original frames in {BACKUP_DIR}...")
        os.makedirs(BACKUP_DIR, exist_ok=True)
        for i in range(1, TOTAL_FRAMES + 1):
            name = f"frame_{i:04d}.jpg"
            src = os.path.join(SRC_DIR, name)
            if os.path.exists(src):
                shutil.copy2(src, os.path.join(BACKUP_DIR, name))
        print("Backup complete.")
    else:
        print(f"Backup already exists at {BACKUP_DIR}.")

def process_frame(idx):
    name = f"frame_{idx:04d}.jpg"
    backup_path = os.path.join(BACKUP_DIR, name)
    out_public_path = os.path.join(SRC_DIR, name)
    out_root_path = os.path.join(ROOT_FRAMES_DIR, name)
    
    # Read from pristine backup copy
    src_file = backup_path if os.path.exists(backup_path) else out_public_path
    
    with Image.open(src_file) as raw_img:
        img = raw_img.convert('RGB')
        
        # 1. Subtle de-blocking filter: soften JPEG 8x8 block artifacts before upscale
        smoothed = img.filter(ImageFilter.GaussianBlur(radius=0.4))
        pre_clean = Image.blend(img, smoothed, alpha=0.20)
        
        # 2. High-precision Lanczos upscale to Full HD 1080p (1920x1080)
        fhd = pre_clean.resize((1920, 1080), Image.Resampling.LANCZOS)
        
        # 3. Adaptive Unsharp Mask for crisp edges without noise amplification
        sharp = fhd.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
        
        # 4. Micro-contrast & edge clarity
        sharp = ImageEnhance.Sharpness(sharp).enhance(1.15)
        contrasted = ImageEnhance.Contrast(sharp).enhance(1.04)
        final_img = ImageEnhance.Color(contrasted).enhance(1.03)
        
        # 5. Save with pristine Full HD quality (quality=92, subsampling=0 for 4:4:4 chroma)
        final_img.save(out_public_path, 'JPEG', quality=92, subsampling=0)
        if os.path.exists(ROOT_FRAMES_DIR):
            final_img.save(out_root_path, 'JPEG', quality=92, subsampling=0)
            
    return idx

def main():
    backup_originals()
    print(f"Enhancing {TOTAL_FRAMES} frames to Full HD 1080p with ultra-crisp clarity...")
    t0 = time.time()
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(process_frame, range(1, TOTAL_FRAMES + 1)))
        
    duration = time.time() - t0
    print(f"Successfully enhanced all {len(results)} frames in {duration:.2f} seconds!")

if __name__ == '__main__':
    main()
