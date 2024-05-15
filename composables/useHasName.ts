export function useHasName() {
  const router = useRouter()
  const route = useRoute()

  const cookieName = useCookie(User.Name)

  if(!cookieName.value) {
    router.push({path: RoutePath.SetUserName, query: {redirect: route.path}})
  }
}