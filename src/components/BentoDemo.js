import React from 'react';
import { Box, Typography } from '@mui/material';
import { FileTextIcon, InputIcon, GlobeIcon, CalendarIcon, BellIcon } from '@radix-ui/react-icons';
import Carousel from './Carousel';

// Sample features for homepage grid
const features = [
	{
		name: 'Discover Events',
		description: 'Browse upcoming concerts, movies, and shows.',
		href: '/events',
		icon: GlobeIcon,
		backgroundSrc: '/images/discover-events.jpg',
		className: '',
	},
	{
		name: 'Manage Bookings',
		description: 'View and edit your booked tickets.',
		href: '/bookings',
		icon: FileTextIcon,
		backgroundSrc: '/images/manage-bookings.png',
		className: '',
	},
	{
		name: 'Stay Notified',
		description: 'Get alerts for new offers and support updates.',
		href: '/offers',
		icon: BellIcon,
		backgroundSrc: '/images/stay-notified.jpg',
		className: '',
	},
	{
		name: 'Calendar View',
		description: 'Filter events by date.',
		href: '/events',
		icon: CalendarIcon,
		backgroundSrc: '/images/calendar-view.png',
		className: '',
	},
	{
		name: 'Quick Search',
		description: 'Search all your events and bookings instantly.',
		href: '/search',
		icon: InputIcon,
		backgroundSrc: '/images/quick-search.jpg',
		className: '',
	},
];

export default function BentoDemo() {
	// Map feature objects to Carousel item shape
	const carouselItems = features.map(f => ({
		image: f.backgroundSrc,
		alt: f.name,
		title: f.name,
		buttonText: 'Learn More',
		href: f.href
	}));
	return (
		<Box sx={{ py: 8 }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Explore Features
			</Typography>
			<Carousel items={carouselItems} />
		</Box>
	);
}
