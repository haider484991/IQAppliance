'use client';

import React from 'react';
import type { City, State } from '@/lib/types';
import dynamic from 'next/dynamic';

// Dynamically import service components
const ApplianceRepair = dynamic(() => import('@/components/services/ApplianceRepair').then(mod => mod.default), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

interface ServiceSelectorProps {
  serviceId: string;
  city: City;
  state: State | string;
}

interface ServiceComponentProps {
  city: City;
  state: State | string;
}

// Type guard to check if a component accepts our props
function isServiceComponent(component: any): component is React.ComponentType<ServiceComponentProps> {
  return typeof component === 'function';
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ serviceId, city, state }) => {
  if (!city || !state) {
    return <div>Location information is required</div>;
  }

  const getServiceComponent = (id: string) => {
    switch (id) {
      case 'appliance-repair':
        return ApplianceRepair;
      default:
        return null;
    }
  };

  const ServiceComponent = getServiceComponent(serviceId);

  if (!ServiceComponent) {
    return <div>Service not found</div>;
  }

  if (!isServiceComponent(ServiceComponent)) {
    return <div>Invalid service component</div>;
  }

  return <ServiceComponent city={city} state={state} />;
};

export default ServiceSelector;