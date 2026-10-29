/**
 * ProductCardSkeleton provides a shimmer placeholder while product data is loading.
 * Preserves the exact height and layout of the real ProductCard to prevent layout shift.
 */
export default function ProductCardSkeleton() {
  return (
    <div className="product-fsd-card h-100" aria-hidden="true">
      {/* Top Media Placeholder */}
      <div className="product-card-top position-relative d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
        <div
          className="product-skeleton-shimmer rounded-3"
          style={{ width: '65%', height: '70%' }}
        />
      </div>

      {/* Content Placeholder */}
      <div className="product-card-content d-flex flex-column flex-grow-1 p-4">
        {/* Model */}
        <div
          className="product-skeleton-shimmer mb-2"
          style={{ width: '45%', height: '14px' }}
        />

        {/* Title (2 lines) */}
        <div
          className="product-skeleton-shimmer mb-2"
          style={{ width: '90%', height: '18px' }}
        />
        <div
          className="product-skeleton-shimmer mb-3"
          style={{ width: '65%', height: '18px' }}
        />

        {/* Specs Box */}
        <div className="product-specs-box mb-3 p-3">
          <div
            className="product-skeleton-shimmer mb-2"
            style={{ width: '50%', height: '12px' }}
          />
          <div className="d-flex justify-content-between py-1">
            <div className="product-skeleton-shimmer" style={{ width: '40%', height: '12px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '35%', height: '12px' }} />
          </div>
          <div className="d-flex justify-content-between py-1">
            <div className="product-skeleton-shimmer" style={{ width: '45%', height: '12px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '30%', height: '12px' }} />
          </div>
          <div className="d-flex justify-content-between py-1">
            <div className="product-skeleton-shimmer" style={{ width: '35%', height: '12px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '40%', height: '12px' }} />
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mb-3">
          <div
            className="product-skeleton-shimmer mb-2"
            style={{ width: '35%', height: '12px' }}
          />
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="product-skeleton-shimmer rounded-circle" style={{ width: '14px', height: '14px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '75%', height: '12px' }} />
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="product-skeleton-shimmer rounded-circle" style={{ width: '14px', height: '14px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '85%', height: '12px' }} />
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="product-skeleton-shimmer rounded-circle" style={{ width: '14px', height: '14px' }} />
            <div className="product-skeleton-shimmer" style={{ width: '65%', height: '12px' }} />
          </div>
        </div>

        {/* Buttons Action Row */}
        <div className="product-card-actions mt-auto pt-3 d-flex justify-content-center">
          <div
            className="product-skeleton-shimmer rounded-pill"
            style={{ width: '100%', maxWidth: '240px', height: '40px' }}
          />
        </div>
      </div>
    </div>
  );
}
