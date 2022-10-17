import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef } from "react";
import { useRouter } from "next/router";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
	const { asPath } = useRouter();
	return href ? (
		<NextLink passHref href={href}>
			<ChakraLink aria-current={asPath === href ? "page" : undefined} ref={ref} {...rest} />
		</NextLink>
	) : null;
});

export default Link;
