import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef, useMemo } from "react";
import { useRouter } from "next/router";

interface Props extends LinkProps {
	strict?: boolean;
	active?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, Props>(
	({ href, strict = true, active, ...props }, ref) => {
		const { asPath } = useRouter();
		const isActive = useMemo(() => {
			if (active !== undefined) {
				return active;
			}
			if (href === undefined) {
				return false;
			}
			const encodedURI = encodeURI(href);
			return strict ? encodedURI === asPath : asPath.includes(encodedURI);
		}, [strict, href, asPath, active]);
		return href ? (
			<NextLink passHref href={href}>
				<ChakraLink aria-current={isActive ? "page" : undefined} ref={ref} {...props} />
			</NextLink>
		) : null;
	}
);

export default Link;
