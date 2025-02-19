import { Service } from '../types';

interface City {
  name: string;
}

interface State {
  abbreviation: string;
}

interface ServiceContent {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  commonIssues: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  serviceAreas: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const getLocationBasedContent = (template: string, city?: City, state?: State): string => {
  if (!city || !state) {
    return template
      .replace(/\[city\]/g, 'your area')
      .replace(/\[st\]/g, '')
      .replace(/In your area,\s*/g, '')
      .replace(/\s+,\s+,/g, ',');
  }
  return template.replace(/\[city\]/g, city.name).replace(/\[st\]/g, state.abbreviation);
};

export const getApplianceRepairContent = (city: City, state: State): ServiceContent => ({
  title: `${city.name} ${state.abbreviation} Appliance Repair Services | IQ Appliances`,
  description: `${city.name} ${state.abbreviation} appliance repair services. For fast, reliable repair service for dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers call 1-833-348-1798 today.`,
  
  features: [
    {
      title: "Refrigerator Repair",
      description: "Fixing cooling issues, leaks, compressor problems, and more."
    },
    {
      title: "Dishwasher Repair",
      description: "Addressing drainage problems, poor cleaning performance, and error codes."
    },
    {
      title: "Stove & Oven Repair",
      description: "Repairing temperature inconsistencies, burner issues, and ignition failures."
    },
    {
      title: "Ranges",
      description: "Troubleshooting electric and gas range malfunctions."
    },
    {
      title: "Washer & Dryer Repair",
      description: "Resolving spin cycle failures, leaks, dryer heating problems, and more."
    }
  ],

  commonIssues: [
    {
      title: "Refrigerator",
      description: "Food spoiling quickly, strange noises, excessive frost buildup"
    },
    {
      title: "Dishwasher",
      description: "Dishes not coming out clean, standing water, foul odor"
    },
    {
      title: "Stove/Oven/Range",
      description: "Uneven cooking, gas smell, burner not igniting"
    },
    {
      title: "Washing Machine",
      description: "Water leaks, shaking violently, clothes coming out soaked"
    },
    {
      title: "Dryer",
      description: "Clothes not drying properly, burning smell, excessive noise"
    }
  ],

  benefits: [
    {
      title: "Fast & Convenient Scheduling",
      description: "We understand that a broken appliance can disrupt your daily routine. Our team makes it easy to schedule a repair appointment at a time that works best for you.",
      icon: "clock"
    },
    {
      title: "Experienced & Knowledgeable Technicians",
      description: "We connect you with experienced professionals who are well-versed in diagnosing and repairing a wide range of appliance issues. Their expertise ensures accurate troubleshooting and efficient repairs.",
      icon: "tools"
    },
    {
      title: "Comprehensive Major Appliance Repairs",
      description: "Our network specializes in repairing all major household appliances, ensuring you don't have to juggle multiple service providers.",
      icon: "wrench"
    },
    {
      title: "Service Across the Tri-State Area",
      description: "IQ Appliances proudly serves New York, New Jersey, and Pennsylvania, offering a seamless repair experience to homeowners and businesses in these regions.",
      icon: "map"
    }
  ],

  serviceAreas: [
    "New York",
    "New Jersey",
    "Pennsylvania"
  ],

  faqs: [
    {
      question: "What brands do you service?",
      answer: "Our skilled professionals work on leading appliance brands, including Whirlpool, GE, Samsung, LG, Maytag, Frigidaire, Bosch, KitchenAid, and more."
    },
    {
      question: "How quickly can you respond to service calls?",
      answer: "We offer fast response times and can often schedule same-day or next-day service for urgent repairs."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "While we carefully select our service providers, all contractors are independent and IQ Appliances does not warrant or guarantee any work performed."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve the entire Tri-State area, including New York, New Jersey, and Pennsylvania."
    }
  ]
});

export const services: Service[] = [
  {
    id: 'appliance-repair',
    title: 'Professional Appliance Repair Services',
    slug: 'appliance-repair',
    description: 'Expert repair services for all major household appliances',
    image: '/images/appliance-repair-banner.webp',
    alt: 'Professional appliance repair services',
    contentTemplate: (city?: City, state?: State) => {
      if (!city || !state) {
        return 'Professional appliance repair services for all major household appliances.';
      }
      return getApplianceRepairContent(city, state).description;
    }
  }
];