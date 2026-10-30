export interface GallerySkeletonProps {
  count?: number;
}

/**
 * Shimmer loading placeholder for the gallery grid.
 * Matches exact geometry of GalleryItemCard to eliminate cumulative layout shift.
 */
export default function GallerySkeleton({ count = 6 }: GallerySkeletonProps) {
  return (
    <div className="row g-4" aria-label="Loading gallery photos">
      {Array.from({ length: count }).map((_, index) => (
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column" key={`gal-skel-${index}`}>
          <div className="gallery-card h-100 d-flex flex-column" aria-hidden="true">
            {/* Shimmer Image Box */}
            <div className="gallery-image-box position-relative" style={{ height: '250px' }}>
              <div
                className="gallery-skeleton-shimmer w-100 h-100"
                style={{ borderRadius: '16px 16px 0 0' }}
              />
              <div
                className="gallery-skeleton-shimmer position-absolute"
                style={{
                  top: '14px',
                  left: '14px',
                  width: '90px',
                  height: '24px',
                  borderRadius: '6px',
                }}
              />
            </div>

            {/* Shimmer Caption Box */}
            <div className="gallery-meta mt-auto p-3">
              <div
                className="gallery-skeleton-shimmer mb-2"
                style={{ width: '85%', height: '16px', borderRadius: '4px' }}
              />
              <div
                className="gallery-skeleton-shimmer"
                style={{ width: '55%', height: '14px', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
