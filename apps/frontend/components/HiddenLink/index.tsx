import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef } from "react";

const HiddenLink = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
	return href ? (
		<NextLink passHref href={href} ref={ref}>
			<ChakraLink display="contents" {...rest} />
		</NextLink>
	) : null;
});

export default HiddenLink;
