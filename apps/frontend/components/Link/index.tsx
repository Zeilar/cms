import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef, useMemo } from "react";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps extends ChakraLinkProps {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
	const { asPath } = useRouter();
	const isActive = useMemo(() => asPath === href, [asPath, href]);
	return href ? (
		<NextLink passHref href={href}>
			<ChakraLink aria-current={isActive ? "page" : undefined} ref={ref} {...rest} />
		</NextLink>
	) : null;
});

export default Link;
