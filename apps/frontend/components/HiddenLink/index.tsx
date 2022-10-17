import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const UnstyledLink = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
	const { asPath } = useRouter();
	return href ? (
		<NextLink passHref href={href} ref={ref}>
			<Link
				aria-current={asPath === href ? "page" : undefined}
				_hover={{ textDecor: "none" }}
				{...rest}
			/>
		</NextLink>
	) : null;
});

export default UnstyledLink;
