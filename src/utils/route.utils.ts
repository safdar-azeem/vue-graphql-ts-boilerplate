export const getRelativeRoute = (route: string, prefix: string): string => {
	return route.replace(prefix, '')
}
