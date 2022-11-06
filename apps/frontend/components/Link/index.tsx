import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef, useMemo } from "react";
import { useRouter } from "next/router";

interface Props extends LinkProps {
	strict?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, Props>(({ href, strict = true, ...rest }, ref) => {
	const { asPath } = useRouter();
	const isActive = useMemo(() => {
		if (href == null) {
			return false;
		}
		const encodedURI = encodeURI(href);
		return strict ? encodedURI === asPath : asPath.includes(encodedURI);
	}, [strict, href, asPath]);
	return href ? (
		<NextLink passHref href={href}>
			<ChakraLink aria-current={isActive ? "page" : undefined} ref={ref} {...rest} />
		</NextLink>
	) : null;
});

export default Link;
