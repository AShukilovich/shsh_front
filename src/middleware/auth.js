export default function auth({ next, store }){
	if ( store.getters.isAuthenticated ) {
		next();
  } else {
		next({name: 'signin'});
	}
} 