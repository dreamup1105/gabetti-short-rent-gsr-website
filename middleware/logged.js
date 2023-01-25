export default function ({ route,store, redirect, app }) {
  if (!store.state.auth.loggedIn) {
		return redirect(app.localePath('/'),route.query);
	}
}
