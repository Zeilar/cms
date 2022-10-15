import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef, useMemo } from "react";
import { useRouter } from "next/router";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
	const { pathname } = useRouter();
	const isActive = useMemo(() => pathname === href, [pathname, href]);
	return href ? (
		<NextLink passHref href={href}>
			<ChakraLink aria-current={isActive ? "page" : undefined} ref={ref} {...rest} />
		</NextLink>
	) : null;
});

export default Link;
