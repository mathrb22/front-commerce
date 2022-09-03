import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type RouteGuardProps = {
	children: any;
};

const publicPaths = ['/login', '/signup', 'forgot-password'];

function RouteGuard({ children }: any) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// on initial load - run auth check
		authCheck(router.asPath);

		// on route change start - hide page content by setting authorized to false
		const hideContent = () => setAuthorized(false);
		router.events.on('routeChangeStart', hideContent);

		// on route change complete - run auth check
		router.events.on('routeChangeComplete', authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off('routeChangeStart', hideContent);
			router.events.off('routeChangeComplete', authCheck);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function authCheck(url: string) {
		// redirect to login page if accessing a private page and not logged in
		const user = localStorage.getItem('frontcommerce.user')
			? JSON.parse(localStorage.getItem('frontcommerce.user') as string)
			: null;
		const path = url.split('?')[0];
		if (!user && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: '/login',
			});
		} else {
			setAuthorized(true);
		}
	}

	return authorized && children;
}

export { RouteGuard };
