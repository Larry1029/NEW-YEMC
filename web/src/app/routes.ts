import {
	type RouteConfigEntry,
	index,
	route,
} from '@react-router/dev/routes';
const notFound = route('*?', './__create/not-found.tsx');
const pageRoutes: RouteConfigEntry[] = [
	index('./page.jsx'),
	route('about', './about/page.jsx'),
	route('account/logout', './account/logout/page.jsx'),
	route('account/signin', './account/signin/page.jsx'),
	route('account/signup', './account/signup/page.jsx'),
	route('admin/applications', './admin/applications/page.jsx'),
	route('admin/users', './admin/users/page.jsx'),
	route('community', './community/page.jsx'),
	route('contact', './contact/page.jsx'),
	route('faq', './faq/page.jsx'),
	route('forgot-password', './forgot-password/page.jsx'),
	route('gallery', './gallery/page.jsx'),
	route('join', './join/page.jsx'),
	route('lessons', './lessons/page.jsx'),
	route('reset-password', './reset-password/page.jsx'),
	route('resources', './resources/page.jsx'),
	route('scan/:token', './scan/[token]/page.jsx'),
];
const routes = [...pageRoutes, notFound];
export default routes;
