'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  INITIAL_CONTACT,
  PRODUCTS_CATALOG,
  GALLERY_ITEMS,
  INITIAL_ENQUIRIES,
  INITIAL_USERS,
} from '@/data/mockData';

export default function AdminPanelPage() {
  const router = useRouter();

  // Authentication & Current User State (Section 8.1 & 8.3)
  const [currentUser, setCurrentUser] = useState({
    name: 'Rajesh Kannan',
    email: 'admin@comfortaircon.com',
    role: 'Super Admin',
    permissions: ['Products', 'Gallery', 'Enquiries', 'Contact', 'Users'],
  });

  // Active module tab
  const [activeTab, setActiveTab] = useState('enquiries');

  // Module Data States
  const [enquiries, setEnquiries] = useState([]);
  const [enquiryFilterStatus, setEnquiryFilterStatus] = useState('ALL');
  const [enquirySearch, setEnquirySearch] = useState('');

  const [products, setProducts] = useState(PRODUCTS_CATALOG);
  const [productBrandFilter, setProductBrandFilter] = useState('ALL');

  const [gallery, setGallery] = useState(GALLERY_ITEMS);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('ALL');

  const [users, setUsers] = useState(INITIAL_USERS);
  const [contactData, setContactData] = useState(INITIAL_CONTACT);

  // Modals state
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    brand: 'Carrier',
    category: 'Split AC',
    model: '',
    specifications: '',
    features: '',
    image: '/images/carrier-split.png',
    published: true,
  });

  const [newGalleryModal, setNewGalleryModal] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({
    title: '',
    caption: '',
    category: 'Installation photos',
    image: '/images/carrier-vrf.png',
    location: 'Pondicherry',
    published: true,
  });

  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    permissions: ['Products', 'Gallery', 'Enquiries', 'Contact'],
    status: 'Active',
  });

  const [feedbackNotice, setFeedbackNotice] = useState(null);
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Load Auth & Enquiries on Mount
  useEffect(() => {
    setIsMounted(true);
    setCurrentDateStr(
      new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('comfort_aircon_admin_auth');
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          setCurrentUser(parsed);
          // Set initial default tab based on role
          if (parsed.role === 'Content Manager') {
            setActiveTab('products');
          } else {
            setActiveTab('enquiries');
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Load Enquiries from localStorage
      const loadEnquiries = () => {
        const storedEnq = localStorage.getItem('comfort_aircon_enquiries');
        if (storedEnq) {
          try {
            const parsed = JSON.parse(storedEnq);
            setEnquiries(parsed);
          } catch (e) {
            setEnquiries(INITIAL_ENQUIRIES);
          }
        } else {
          setEnquiries(INITIAL_ENQUIRIES);
          localStorage.setItem('comfort_aircon_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
        }
      };

      loadEnquiries();
      window.addEventListener('storage', loadEnquiries);
      return () => window.removeEventListener('storage', loadEnquiries);
    }
  }, []);

  const notify = (msg) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // Section 8.3 Role Matrix Enforcement
  const canAccessUsers = currentUser.role === 'Super Admin';
  const canAccessEnquiries = currentUser.role === 'Super Admin' || currentUser.role === 'Admin';
  const canAccessProducts = true;
  const canAccessGallery = true;
  const canAccessContact = true;

  // Handle Role Switching for Quick Testing
  const handleRoleSwitch = (newRole) => {
    let updated;
    if (newRole === 'Super Admin') {
      updated = {
        name: 'Rajesh Kannan',
        email: 'admin@comfortaircon.com',
        role: 'Super Admin',
        permissions: ['Products', 'Gallery', 'Enquiries', 'Contact', 'Users'],
      };
      setActiveTab('enquiries');
    } else if (newRole === 'Admin') {
      updated = {
        name: 'Suresh Kumar',
        email: 'suresh@comfortaircon.com',
        role: 'Admin',
        permissions: ['Products', 'Gallery', 'Enquiries', 'Contact'],
      };
      setActiveTab('enquiries');
    } else {
      updated = {
        name: 'Ananya Devi',
        email: 'content@comfortaircon.com',
        role: 'Content Manager',
        permissions: ['Products', 'Gallery', 'Contact'],
      };
      setActiveTab('products');
    }

    setCurrentUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('comfort_aircon_admin_auth', JSON.stringify(updated));
    }
    notify(`Switched active session to: ${newRole}`);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('comfort_aircon_admin_auth');
    }
    router.push('/admin-login');
  };

  // 1. ENQUIRY MANAGEMENT ACTIONS (FSD Section 9.4)
  const handleStatusChange = (id, newStatus) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    setEnquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('comfort_aircon_enquiries', JSON.stringify(updated));
    }
    notify(`Enquiry ${id} status updated to: ${newStatus}`);
  };

  const handleDeleteEnquiry = (id) => {
    if (!confirm(`Are you sure you want to delete enquiry ${id}?`)) return;
    const updated = enquiries.filter((enq) => enq.id !== id);
    setEnquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('comfort_aircon_enquiries', JSON.stringify(updated));
    }
    notify(`Enquiry ${id} removed.`);
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchStatus = enquiryFilterStatus === 'ALL' || item.status === enquiryFilterStatus;
    const query = enquirySearch.toLowerCase();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.mobile.includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);
    return matchStatus && matchQuery;
  });

  // 2. PRODUCT MANAGEMENT ACTIONS (FSD Section 9.2)
  const handleToggleProductPublish = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    setProducts(updated);
    notify('Product publish status toggled.');
  };

  const handleDeleteProduct = (id) => {
    if (!confirm('Are you sure you want to remove this product from the catalogue?')) return;
    setProducts(products.filter((p) => p.id !== id));
    notify('Product removed.');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.model) return;

    const newProd = {
      id: `prod-${Date.now()}`,
      brand: newProductData.brand,
      isPrimary: newProductData.brand === 'Carrier',
      category: newProductData.category,
      name: newProductData.name,
      model: newProductData.model,
      specifications: newProductData.specifications || 'Standard specifications',
      specsList: [
        { label: 'Model', value: newProductData.model },
        { label: 'Brand', value: newProductData.brand },
        { label: 'Category', value: newProductData.category },
      ],
      features: newProductData.features || 'Standard features',
      featuresList: newProductData.features
        ? newProductData.features.split('\n')
        : ['High Efficiency Inverter', 'Genuine OEM Warranty'],
      image: newProductData.image,
      published: newProductData.published,
    };

    setProducts([newProd, ...products]);
    setNewProductModal(false);
    setNewProductData({
      name: '',
      brand: 'Carrier',
      category: 'Split AC',
      model: '',
      specifications: '',
      features: '',
      image: '/images/carrier-split.png',
      published: true,
    });
    notify(`Product "${newProd.name}" added successfully.`);
  };

  // 3. GALLERY MANAGEMENT ACTIONS (FSD Section 9.3)
  const handleToggleGalleryPublish = (id) => {
    const updated = gallery.map((g) =>
      g.id === id ? { ...g, published: !g.published } : g
    );
    setGallery(updated);
    notify('Gallery image visibility updated.');
  };

  const handleDeleteGallery = (id) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;
    setGallery(gallery.filter((g) => g.id !== id));
    notify('Gallery item removed.');
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!newGalleryData.title) return;

    const newItem = {
      id: Date.now(),
      title: newGalleryData.title,
      caption: newGalleryData.caption || newGalleryData.title,
      category: newGalleryData.category,
      image: newGalleryData.image,
      location: newGalleryData.location,
      published: newGalleryData.published,
    };

    setGallery([newItem, ...gallery]);
    setNewGalleryModal(false);
    setNewGalleryData({
      title: '',
      caption: '',
      category: 'Installation photos',
      image: '/images/carrier-vrf.png',
      location: 'Pondicherry',
      published: true,
    });
    notify(`Gallery photo "${newItem.title}" published.`);
  };

  // 4. USERS & PERMISSIONS ACTIONS (FSD Section 9.1)
  const handleToggleUserStatus = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Deactivated' : 'Active' } : u
    );
    setUsers(updated);
    notify('User active status toggled.');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      permissions: newUserData.permissions,
      status: newUserData.status,
      lastLogin: 'Never',
    };

    setUsers([...users, newUser]);
    setNewUserModal(false);
    setNewUserData({
      name: '',
      email: '',
      password: '',
      role: 'Admin',
      permissions: ['Products', 'Gallery', 'Enquiries', 'Contact'],
      status: 'Active',
    });
    notify(`Staff user "${newUser.name}" created.`);
  };

  // 5. CONTACT MANAGEMENT ACTIONS (FSD Section 9.5)
  const handleSaveContact = (e) => {
    e.preventDefault();
    notify('Contact information updated across Header, Footer & Contact page.');
  };

  return (
    <div className="admin-panel-layout">
      {/* Toast Notification Banner */}
      {feedbackNotice && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-primary py-2 px-4 shadow-lg rounded-pill fw-bold small d-flex align-items-center gap-2"
          style={{ zIndex: 1100 }}
        >
          <i className="fa-solid fa-circle-check text-primary"></i>
          <span>{feedbackNotice}</span>
        </div>
      )}

      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* SIDEBAR NAVIGATION (FSD Section 8.2 item 1) */}
          <div className="col-lg-2 admin-sidebar">
            {/* Brand Logo & Title */}
            <div className="px-2 pb-3 mb-3 border-bottom border-secondary">
              <Link href="/" className="d-block mb-1">
                <img
                  src="/images/logo1.png"
                  alt="Comfort Aircon"
                  style={{ maxHeight: '38px', width: 'auto' }}
                />
              </Link>
              <div className="text-light small fw-bold">Admin Operations Panel</div>
              <small className="text-muted fs-8">Carrier &amp; Toshiba Authorized</small>
            </div>

            {/* Current User Profile Card */}
            <div className="p-3 bg-dark rounded-3 border border-secondary mb-3">
              <div className="d-flex align-items-center gap-2 mb-1">
                <div
                  className="rounded-circle bg-primary-blue text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-white small fw-bold text-truncate">{currentUser.name}</div>
                  <span className="badge bg-primary-blue text-white fs-8 py-0 px-2">
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Role Tester Dropdown (For demo testing of role matrix) */}
            <div className="mb-3 px-2">
              <label className="text-muted small fs-8 text-uppercase fw-bold mb-1">
                Active Role Tester:
              </label>
              <select
                className="form-select form-select-sm bg-dark text-light border-secondary"
                value={currentUser.role}
                onChange={(e) => handleRoleSwitch(e.target.value)}
              >
                <option value="Super Admin">Super Admin (All Modules)</option>
                <option value="Admin">Admin (Products, Gallery, Leads, Contact)</option>
                <option value="Content Manager">Content Manager (Products, Gallery, Contact)</option>
              </select>
            </div>

            {/* Navigation Menu (Based on Role Access Matrix Section 8.3) */}
            <div className="nav flex-column mb-auto">
              {/* Module 1: Roles & Permissions (Super Admin only) */}
              {canAccessUsers && (
                <button
                  type="button"
                  className={`admin-nav-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="fa-solid fa-users-gear"></i>
                  <span>Roles &amp; Permissions</span>
                </button>
              )}

              {/* Module 2: Product Management */}
              {canAccessProducts && (
                <button
                  type="button"
                  className={`admin-nav-link ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  <i className="fa-solid fa-boxes-stacked"></i>
                  <span>Products</span>
                </button>
              )}

              {/* Module 3: Gallery Management */}
              {canAccessGallery && (
                <button
                  type="button"
                  className={`admin-nav-link ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  <i className="fa-solid fa-images"></i>
                  <span>Gallery</span>
                </button>
              )}

              {/* Module 4: Enquiry Management */}
              {canAccessEnquiries && (
                <button
                  type="button"
                  className={`admin-nav-link ${activeTab === 'enquiries' ? 'active' : ''}`}
                  onClick={() => setActiveTab('enquiries')}
                >
                  <i className="fa-solid fa-inbox"></i>
                  <span>Customer Enquiries</span>
                  {enquiries.filter((e) => e.status === 'New').length > 0 && (
                    <span className="badge bg-danger ms-auto rounded-pill">
                      {enquiries.filter((e) => e.status === 'New').length}
                    </span>
                  )}
                </button>
              )}

              {/* Module 5: Contact Management */}
              {canAccessContact && (
                <button
                  type="button"
                  className={`admin-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <i className="fa-solid fa-address-card"></i>
                  <span>Contact Details</span>
                </button>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 mt-4 border-top border-secondary">
              <Link
                href="/"
                className="admin-nav-link text-light opacity-75 small py-2"
                target="_blank"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>View Public Website</span>
              </Link>
              <button
                type="button"
                className="admin-nav-link text-danger small py-2"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout Session</span>
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="col-lg-10 admin-content-area">
            {/* Top Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <div>
                <h1 className="fs-4 fw-bold text-dark-navy mb-0">
                  {activeTab === 'enquiries' && 'Enquiry Management'}
                  {activeTab === 'products' && 'Product Management'}
                  {activeTab === 'gallery' && 'Gallery Management'}
                  {activeTab === 'contact' && 'Contact Management'}
                  {activeTab === 'users' && 'Roles & Permissions'}
                </h1>
                <small className="text-muted">
                  Logged in as <strong>{currentUser.name}</strong> ({currentUser.role})
                </small>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-white text-dark border px-3 py-2 shadow-xs">
                  <i className="fa-solid fa-calendar-day text-primary-blue me-1"></i>
                  {currentDateStr || 'Operations Dashboard'}
                </span>
              </div>
            </div>

            {/* TAB 1: ENQUIRY MANAGEMENT (FSD Section 9.4) */}
            {activeTab === 'enquiries' && canAccessEnquiries && (
              <div>
                <div className="admin-card">
                  <div className="row g-3 align-items-center mb-4">
                    <div className="col-md-5">
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <i className="fa-solid fa-magnifying-glass text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search leads by name, mobile, service, or location..."
                          value={enquirySearch}
                          onChange={(e) => setEnquirySearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small fw-bold text-nowrap">Filter:</span>
                        <select
                          className="form-select form-select-sm"
                          value={enquiryFilterStatus}
                          onChange={(e) => setEnquiryFilterStatus(e.target.value)}
                        >
                          <option value="ALL">All Statuses ({enquiries.length})</option>
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 text-md-end">
                      <span className="text-muted small">
                        Showing <strong>{filteredEnquiries.length}</strong> enquiries
                      </span>
                    </div>
                  </div>

                  {/* Table with Exact 7 Read-Only Fields + Status Dropdown + Delete (Section 9.4) */}
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Lead ID</th>
                          <th>1. Customer Name</th>
                          <th>2. Mobile</th>
                          <th>3. Email</th>
                          <th>4. Service</th>
                          <th>5. Product Interested</th>
                          <th>6. Location</th>
                          <th>7. Message</th>
                          <th>8. Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnquiries.map((enq) => (
                          <tr key={enq.id}>
                            <td>
                              <span className="fw-bold text-dark-navy">{enq.id}</span>
                              <div className="fs-8 text-muted">
                                {isMounted && enq.createdAt
                                  ? new Date(enq.createdAt).toLocaleDateString()
                                  : enq.createdAt
                                  ? enq.createdAt.split('T')[0]
                                  : '—'}
                              </div>
                            </td>
                            <td>
                              <span className="fw-bold">{enq.name}</span>
                            </td>
                            <td>
                              <a
                                href={`tel:${enq.mobile}`}
                                className="text-decoration-none fw-semibold text-primary-blue"
                              >
                                {enq.mobile}
                              </a>
                            </td>
                            <td>
                              <span className="small text-muted">{enq.email || '—'}</span>
                            </td>
                            <td>
                              <span className="badge bg-light text-navy border">
                                {enq.service}
                              </span>
                            </td>
                            <td>
                              <span className="small text-truncate d-inline-block" style={{ maxWidth: '140px' }} title={enq.productInterested}>
                                {enq.productInterested || '—'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-white border text-dark">
                                {enq.location}
                              </span>
                            </td>
                            <td>
                              <span
                                className="small text-muted d-inline-block text-truncate"
                                style={{ maxWidth: '150px' }}
                                title={enq.message}
                              >
                                {enq.message || '—'}
                              </span>
                            </td>
                            <td>
                              <select
                                className={`form-select form-select-sm status-pill status-${enq.status.toLowerCase().replace(' ', '-')}`}
                                value={enq.status}
                                onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                title="Delete enquiry"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredEnquiries.length === 0 && (
                    <div className="text-center py-5 text-muted">
                      <i className="fa-solid fa-folder-open fs-2 mb-2"></i>
                      <p>No enquiries found matching your filter criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCT MANAGEMENT (FSD Section 9.2) */}
            {activeTab === 'products' && canAccessProducts && (
              <div>
                <div className="admin-card">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="small fw-bold text-muted text-uppercase">Brand:</span>
                      <button
                        type="button"
                        className={`btn btn-sm ${productBrandFilter === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setProductBrandFilter('ALL')}
                      >
                        All ({products.length})
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${productBrandFilter === 'Carrier' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setProductBrandFilter('Carrier')}
                      >
                        Carrier
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${productBrandFilter === 'Toshiba' ? 'btn-danger' : 'btn-outline-secondary'}`}
                        onClick={() => setProductBrandFilter('Toshiba')}
                      >
                        Toshiba
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-custom-primary fw-bold"
                      onClick={() => setNewProductModal(true)}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add New Product
                    </button>
                  </div>

                  {/* Table with Exact Fields from Section 9.2: Product Name, Model, Specifications, Features, Image, Publish */}
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Brand</th>
                          <th>Product Name</th>
                          <th>Model</th>
                          <th>Specifications</th>
                          <th>Key Features</th>
                          <th>Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products
                          .filter(
                            (p) => productBrandFilter === 'ALL' || p.brand === productBrandFilter
                          )
                          .map((prod) => (
                            <tr key={prod.id}>
                              <td style={{ width: '60px' }}>
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                                  className="bg-light p-1 rounded border"
                                />
                              </td>
                              <td>
                                {prod.brand === 'Carrier' ? (
                                  <span className="badge bg-primary text-white">Carrier</span>
                                ) : (
                                  <span className="badge bg-danger text-white">Toshiba</span>
                                )}
                              </td>
                              <td>
                                <span className="fw-bold">{prod.name}</span>
                                <div className="small text-muted">{prod.category}</div>
                              </td>
                              <td>
                                <span className="badge bg-light text-dark border font-monospace">
                                  {prod.model}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="small text-muted d-inline-block text-truncate"
                                  style={{ maxWidth: '200px' }}
                                  title={prod.specifications}
                                >
                                  {prod.specifications}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="small text-muted d-inline-block text-truncate"
                                  style={{ maxWidth: '180px' }}
                                  title={prod.features}
                                >
                                  {prod.features}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`btn btn-sm ${prod.published ? 'btn-success' : 'btn-outline-secondary'} py-0 px-2 fs-8 fw-bold rounded-pill`}
                                  onClick={() => handleToggleProductPublish(prod.id)}
                                >
                                  {prod.published ? 'Published' : 'Unpublished'}
                                </button>
                              </td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  title="Delete Product"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY MANAGEMENT (FSD Section 9.3) */}
            {activeTab === 'gallery' && canAccessGallery && (
              <div>
                <div className="admin-card">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="small fw-bold text-muted text-uppercase">Category:</span>
                      {['ALL', 'Installation photos', 'Completed projects', 'Service work', 'Product images'].map(
                        (cat) => (
                          <button
                            key={cat}
                            type="button"
                            className={`btn btn-sm ${galleryCategoryFilter === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setGalleryCategoryFilter(cat)}
                          >
                            {cat === 'ALL' ? 'All' : cat}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-custom-primary fw-bold"
                      onClick={() => setNewGalleryModal(true)}
                    >
                      <i className="fa-solid fa-cloud-arrow-up me-1"></i> Add Gallery Photo
                    </button>
                  </div>

                  {/* Table with Exact Fields: Image, Caption, Category, Publish/Unpublish (Section 9.3) */}
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Title / Caption</th>
                          <th>Category</th>
                          <th>Location Tag</th>
                          <th>Visibility</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gallery
                          .filter(
                            (g) =>
                              galleryCategoryFilter === 'ALL' ||
                              g.category === galleryCategoryFilter
                          )
                          .map((item) => (
                            <tr key={item.id}>
                              <td style={{ width: '80px' }}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  style={{ width: '64px', height: '48px', objectFit: 'cover' }}
                                  className="rounded border"
                                />
                              </td>
                              <td>
                                <span className="fw-bold d-block">{item.title}</span>
                                <small className="text-muted">{item.caption}</small>
                              </td>
                              <td>
                                <span className="badge bg-light text-navy border">
                                  {item.category}
                                </span>
                              </td>
                              <td>
                                <span className="small text-muted">{item.location}</span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`btn btn-sm ${item.published ? 'btn-success' : 'btn-outline-secondary'} py-0 px-2 fs-8 fw-bold rounded-pill`}
                                  onClick={() => handleToggleGalleryPublish(item.id)}
                                >
                                  {item.published ? 'Published' : 'Hidden'}
                                </button>
                              </td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteGallery(item.id)}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CONTACT MANAGEMENT (FSD Section 9.5) */}
            {activeTab === 'contact' && canAccessContact && (
              <div>
                <div className="admin-card">
                  <h3 className="fs-5 fw-bold text-dark-navy mb-3">
                    Public Contact Information Synchronizer
                  </h3>
                  <p className="text-muted small mb-4">
                    Changes saved here dynamically synchronize across the website Header, Footer, and Contact Us page.
                  </p>

                  <form onSubmit={handleSaveContact}>
                    <div className="row g-3 mb-3">
                      {/* Field 1: Phone */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">1. Phone Number (Header, Footer, Call Dial)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                          required
                        />
                      </div>

                      {/* Field 2: WhatsApp */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">2. WhatsApp Helpline Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactData.whatsapp}
                          onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                          required
                        />
                      </div>

                      {/* Field 3: Email */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">3. Official Business Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          required
                        />
                      </div>

                      {/* Field 5: Working Hours */}
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">5. Working Hours Display</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactData.workingHours}
                          onChange={(e) =>
                            setContactData({ ...contactData, workingHours: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Field 4: Address */}
                      <div className="col-12">
                        <label className="form-label small fw-bold">4. Showroom Physical Address</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          value={contactData.address}
                          onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      {/* Field 6: Google Maps Embed */}
                      <div className="col-12">
                        <label className="form-label small fw-bold">6. Google Maps Embed URL</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactData.googleMapsLink}
                          onChange={(e) =>
                            setContactData({ ...contactData, googleMapsLink: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Fields 7-10: Social URLs */}
                      <div className="col-md-3">
                        <label className="form-label small fw-bold">7. Facebook URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={contactData.facebookUrl}
                          onChange={(e) =>
                            setContactData({ ...contactData, facebookUrl: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-bold">8. Instagram URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={contactData.instagramUrl}
                          onChange={(e) =>
                            setContactData({ ...contactData, instagramUrl: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-bold">9. Twitter / X URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={contactData.twitterUrl}
                          onChange={(e) =>
                            setContactData({ ...contactData, twitterUrl: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-bold">10. YouTube Channel URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={contactData.youtubeUrl}
                          onChange={(e) =>
                            setContactData({ ...contactData, youtubeUrl: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="text-end">
                      <button type="submit" className="btn btn-custom-primary px-4 py-2 fw-bold">
                        <i className="fa-solid fa-floppy-disk me-1"></i> Save Changes to Website
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 5: ROLES & PERMISSIONS (FSD Section 9.1 - Super Admin only) */}
            {activeTab === 'users' && canAccessUsers && (
              <div>
                <div className="admin-card">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h3 className="fs-5 fw-bold text-dark-navy mb-1">
                        Staff Users &amp; Role Permissions
                      </h3>
                      <small className="text-muted">
                        Authority model: Super Admin (Full), Admin (Products, Gallery, Leads, Contact), Content Manager (Products, Gallery, Contact)
                      </small>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-custom-primary fw-bold"
                      onClick={() => setNewUserModal(true)}
                    >
                      <i className="fa-solid fa-user-plus me-1"></i> Add Admin User
                    </button>
                  </div>

                  {/* Table with Exact Fields from Section 9.1 */}
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>1. Full Name</th>
                          <th>2. Email / Username</th>
                          <th>4. Role</th>
                          <th>5. Module Permissions</th>
                          <th>6. Status</th>
                          <th>Last Login</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td>
                              <span className="fw-bold">{u.name}</span>
                            </td>
                            <td>
                              <span className="font-monospace text-muted">{u.email}</span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  u.role === 'Super Admin'
                                    ? 'bg-dark text-white'
                                    : u.role === 'Admin'
                                    ? 'bg-primary text-white'
                                    : 'bg-secondary text-white'
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-1 flex-wrap">
                                {u.permissions.map((p) => (
                                  <span key={p} className="badge bg-light text-navy border fs-8">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  u.status === 'Active' ? 'bg-success' : 'bg-danger'
                                }`}
                              >
                                {u.status}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">{u.lastLogin}</small>
                            </td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleToggleUserStatus(u.id)}
                                title="Toggle Active / Deactivate"
                              >
                                {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: ADD PRODUCT (FSD Section 9.2) */}
      {newProductModal && (
        <div
          className="modal-backdrop fade show d-flex align-items-center justify-content-center"
          style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setNewProductModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg w-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark-navy text-white py-3 px-4">
                <h5 className="modal-title fs-6 fw-bold mb-0">Add New Air Conditioner</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setNewProductModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddProduct}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Brand Classification</label>
                      <select
                        className="form-select"
                        value={newProductData.brand}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, brand: e.target.value })
                        }
                      >
                        <option value="Carrier">Carrier</option>
                        <option value="Toshiba">Toshiba</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Category</label>
                      <select
                        className="form-select"
                        value={newProductData.category}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, category: e.target.value })
                        }
                      >
                        <option value="Split AC">Split AC</option>
                        <option value="Cassette AC">Cassette AC</option>
                        <option value="Ductable AC">Ductable AC</option>
                        <option value="VRF Systems">VRF Systems</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">1. Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Carrier Ester Neo 5-Star"
                        value={newProductData.name}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">2. Model *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. CAI18EN5R34F0 (1.5 Ton)"
                        value={newProductData.model}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, model: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">3. Specifications (Text) *</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Capacity, Compressor, Energy Rating, Noise Level, Coil type..."
                        value={newProductData.specifications}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, specifications: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">4. Features (1 per line) *</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="InstaCool 60-second rapid cooling&#10;PM 2.5 Micro-Air Filtration&#10;10-Year Compressor Warranty"
                        value={newProductData.features}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, features: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-8">
                      <label className="form-label small fw-bold">5. Image Asset Path *</label>
                      <select
                        className="form-select"
                        value={newProductData.image}
                        onChange={(e) =>
                          setNewProductData({ ...newProductData, image: e.target.value })
                        }
                      >
                        <option value="/images/carrier-split.png">Carrier Split AC</option>
                        <option value="/images/carrier-cassette.png">Carrier Cassette AC</option>
                        <option value="/images/carrier-duct.png">Carrier Ductable AC</option>
                        <option value="/images/carrier-vrf-ac.png">Carrier VRF System</option>
                        <option value="/images/toshiba-split.png">Toshiba Inverter Split AC</option>
                        <option value="/images/toshiba-cassette.png">Toshiba Inverter Cassette AC</option>
                        <option value="/images/toshiba-vrf.png">Toshiba SMMS-u VRF System</option>
                      </select>
                    </div>

                    <div className="col-md-4 d-flex align-items-center pt-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="prodPublish"
                          checked={newProductData.published}
                          onChange={(e) =>
                            setNewProductData({ ...newProductData, published: e.target.checked })
                          }
                        />
                        <label className="form-check-label small fw-bold" htmlFor="prodPublish">
                          Publish immediately
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light p-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setNewProductModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-custom-primary btn-sm px-4 fw-bold">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY PHOTO (FSD Section 9.3) */}
      {newGalleryModal && (
        <div
          className="modal-backdrop fade show d-flex align-items-center justify-content-center"
          style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setNewGalleryModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered w-100"
            style={{ maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark-navy text-white py-3 px-4">
                <h5 className="modal-title fs-6 fw-bold mb-0">Publish Gallery Work</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setNewGalleryModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddGallery}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">1. Project Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Carrier VRF Installation"
                      value={newGalleryData.title}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">2. Caption / Details</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Short description of the installation or service..."
                      value={newGalleryData.caption}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, caption: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">3. Category (FSD Section 7.5) *</label>
                    <select
                      className="form-select"
                      value={newGalleryData.category}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, category: e.target.value })
                      }
                    >
                      <option value="Installation photos">Installation photos</option>
                      <option value="Completed projects">Completed projects</option>
                      <option value="Service work">Service work</option>
                      <option value="Product images">Product images</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Location Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. White Town, Puducherry"
                      value={newGalleryData.location}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Photo Asset</label>
                    <select
                      className="form-select"
                      value={newGalleryData.image}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, image: e.target.value })
                      }
                    >
                      <option value="/images/why1.png">Technician Servicing AC (why1.png)</option>
                      <option value="/images/why2.png">HVAC Maintenance Setup (why2.png)</option>
                      <option value="/images/carrier-vrf.png">Rooftop VRF Units (carrier-vrf.png)</option>
                      <option value="/images/carrier-cassette.png">Ceiling Cassette (carrier-cassette.png)</option>
                      <option value="/images/carrier_toshiba_sales_showroom.png">Showroom Display</option>
                      <option value="/images/1.png">AC Installation Project (1.png)</option>
                      <option value="/images/4.png">Nitrogen Pressure Testing (4.png)</option>
                      <option value="/images/5.png">Hydro-Jet Wash (5.png)</option>
                    </select>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="galPublish"
                      checked={newGalleryData.published}
                      onChange={(e) =>
                        setNewGalleryData({ ...newGalleryData, published: e.target.checked })
                      }
                    />
                    <label className="form-check-label small fw-bold" htmlFor="galPublish">
                      Publish to public gallery immediately
                    </label>
                  </div>
                </div>
                <div className="modal-footer bg-light p-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setNewGalleryModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-custom-primary btn-sm px-4 fw-bold">
                    Publish Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ADMIN USER (FSD Section 9.1) */}
      {newUserModal && (
        <div
          className="modal-backdrop fade show d-flex align-items-center justify-content-center"
          style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setNewUserModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered w-100"
            style={{ maxWidth: '520px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark-navy text-white py-3 px-4">
                <h5 className="modal-title fs-6 fw-bold mb-0">Create Admin User Account</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setNewUserModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddUser}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">1. Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ramesh Kannan"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">2. Email / Username *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="ramesh@comfortaircon.com"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">3. Temporary Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">4. Assigned Role *</label>
                    <select
                      className="form-select"
                      value={newUserData.role}
                      onChange={(e) => {
                        const r = e.target.value;
                        let perms = [];
                        if (r === 'Super Admin') perms = ['Products', 'Gallery', 'Enquiries', 'Contact', 'Users'];
                        else if (r === 'Admin') perms = ['Products', 'Gallery', 'Enquiries', 'Contact'];
                        else perms = ['Products', 'Gallery', 'Contact'];
                        setNewUserData({ ...newUserData, role: r, permissions: perms });
                      }}
                    >
                      <option value="Super Admin">Super Admin (All Modules)</option>
                      <option value="Admin">Admin (Products, Gallery, Enquiries, Contact)</option>
                      <option value="Content Manager">Content Manager (Products, Gallery, Contact)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">5. Module Permissions</label>
                    <div className="d-flex flex-wrap gap-2">
                      {['Products', 'Gallery', 'Enquiries', 'Contact', 'Users'].map((m) => (
                        <div key={m} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`perm-${m}`}
                            checked={newUserData.permissions.includes(m)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const updated = checked
                                ? [...newUserData.permissions, m]
                                : newUserData.permissions.filter((p) => p !== m);
                              setNewUserData({ ...newUserData, permissions: updated });
                            }}
                          />
                          <label className="form-check-label small" htmlFor={`perm-${m}`}>
                            {m}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="userActiveStatus"
                      checked={newUserData.status === 'Active'}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          status: e.target.checked ? 'Active' : 'Deactivated',
                        })
                      }
                    />
                    <label className="form-check-label small fw-bold" htmlFor="userActiveStatus">
                      Active Account (can log in immediately)
                    </label>
                  </div>
                </div>
                <div className="modal-footer bg-light p-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setNewUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-custom-primary btn-sm px-4 fw-bold">
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
