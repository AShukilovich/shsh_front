export default function guest({ next, store }){
	if ( !store.getters.isAuthenticated ) {
		next();
  } else {
		next({name: 'rent'});
	}
}