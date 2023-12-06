const getPathInfo = (pathMap, pathname) => {
  const pathInfo = pathMap?.[pathname]
  if (pathInfo) {
    return pathInfo
  }

  const splitPathnameList = pathname.split('/')
  const rebuildPathnameList = [...splitPathnameList.slice(0, splitPathnameList.length - 1), ':id']
  const rebuildPathname = rebuildPathnameList.join('/')
  return pathMap?.[rebuildPathname]
}

export default getPathInfo
