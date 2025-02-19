'use client';

// Import only the icons we need from react-icons
import dynamic from 'next/dynamic';

// Moving icons
export const FaTruck = dynamic(() => import('react-icons/fa').then(mod => mod.FaTruck), { ssr: false });
export const FaTruckMoving = dynamic(() => import('react-icons/fa').then(mod => mod.FaTruckMoving), { ssr: false });
export const FaTruckLoading = dynamic(() => import('react-icons/fa').then(mod => mod.FaTruckLoading), { ssr: false });

// Box and packing icons
export const FaBox = dynamic(() => import('react-icons/fa').then(mod => mod.FaBox), { ssr: false });
export const FaBoxes = dynamic(() => import('react-icons/fa').then(mod => mod.FaBoxes), { ssr: false });
export const FaBoxOpen = dynamic(() => import('react-icons/fa').then(mod => mod.FaBoxOpen), { ssr: false });

// Location and navigation icons
export const FaMapMarkedAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaMapMarkedAlt), { ssr: false });
export const MdLocationOn = dynamic(() => import('react-icons/md').then(mod => mod.MdLocationOn), { ssr: false });

// Security and safety icons
export const FaLock = dynamic(() => import('react-icons/fa').then(mod => mod.FaLock), { ssr: false });
export const FaShieldAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaShieldAlt), { ssr: false });
export const MdSecurity = dynamic(() => import('react-icons/md').then(mod => mod.MdSecurity), { ssr: false });

// Building and storage icons
export const FaHome = dynamic(() => import('react-icons/fa').then(mod => mod.FaHome), { ssr: false });
export const FaBuilding = dynamic(() => import('react-icons/fa').then(mod => mod.FaBuilding), { ssr: false });
export const FaWarehouse = dynamic(() => import('react-icons/fa').then(mod => mod.FaWarehouse), { ssr: false });
export const MdStorage = dynamic(() => import('react-icons/md').then(mod => mod.MdStorage), { ssr: false });

// Utility icons
export const FaTools = dynamic(() => import('react-icons/fa').then(mod => mod.FaTools), { ssr: false });
export const FaHandsHelping = dynamic(() => import('react-icons/fa').then(mod => mod.FaHandsHelping), { ssr: false });
export const FaClipboardList = dynamic(() => import('react-icons/fa').then(mod => mod.FaClipboardList), { ssr: false });
export const FaClock = dynamic(() => import('react-icons/fa').then(mod => mod.FaClock), { ssr: false });
export const FaPhoneAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaPhoneAlt), { ssr: false });
export const FaGlobe = dynamic(() => import('react-icons/fa').then(mod => mod.FaGlobe), { ssr: false });
export const FaNetworkWired = dynamic(() => import('react-icons/fa').then(mod => mod.FaNetworkWired), { ssr: false });
export const FaArrowRight = dynamic(() => import('react-icons/fa').then(mod => mod.FaArrowRight), { ssr: false });
export const FaCheckCircle = dynamic(() => import('react-icons/fa').then(mod => mod.FaCheckCircle), { ssr: false });
export const FaStar = dynamic(() => import('react-icons/fa').then(mod => mod.FaStar), { ssr: false });
export const FaHandshake = dynamic(() => import('react-icons/fa').then(mod => mod.FaHandshake), { ssr: false });
export const FaUsers = dynamic(() => import('react-icons/fa').then(mod => mod.FaUsers), { ssr: false });
export const FaCouch = dynamic(() => import('react-icons/fa').then(mod => mod.FaCouch), { ssr: false });
export const MdTrackChanges = dynamic(() => import('react-icons/md').then(mod => mod.MdTrackChanges), { ssr: false });
