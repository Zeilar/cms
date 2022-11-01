import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function rotate(current: number, n: number) {
	const rotation = current + n;
	return rotation >= 360 ? 0 : rotation;
}

export default function Spinner() {
	const [rotations, setRotations] = useState({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	});

	useEffect(() => {
		let animationFrameId: number;
		function animate() {
			setRotations(p => ({
				1: rotate(p[1], 0.5),
				2: rotate(p[2], 0.65),
				3: rotate(p[3], 0.8),
				4: rotate(p[4], 0.95),
			}));
			animationFrameId = requestAnimationFrame(animate);
		}
		animationFrameId = requestAnimationFrame(animate);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<Box
			as="svg"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 500 500"
			width={150}
			height={150}
			version="1.1"
			xmlSpace="preserve"
		>
			<g>
				<ellipse
					stroke="var(--chakra-colors-whiteAlpha-50)"
					strokeWidth={4}
					ry="25"
					rx="25"
					cy="250"
					cx="250"
					fill="var(--chakra-colors-accent-main)"
				/>
				<g transform={`rotate(${rotations[1]} 250 250)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="75"
						rx="75"
						cy="250"
						cx="250"
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={2}
						ry="12"
						rx="12"
						cy="175.82719"
						cx="250"
						fill="#880044"
					/>
				</g>
				<g transform={`rotate(${rotations[2]} 250 250)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="125"
						rx="125"
						cy="250"
						cx="250"
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={2}
						ry="8"
						rx="8"
						cy="250"
						cx="374.66006"
						fill="#7CB518"
					/>
				</g>
				<g transform={`rotate(${rotations[3]} 250 250)`}>
					<ellipse
						transform={`rotate(45 250 250) matrix(1 0 0 1 -111.976 289.076)`}
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="175"
						rx="175"
						cy="-39.07562"
						cx="362.43276"
						fill="none"
					/>
					<ellipse
						transform="matrix(1 0 0 1 -283.587 125.228)"
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={2}
						ry="15"
						rx="15"
						cy="298.74887"
						cx="534.04363"
						fill="#F3DE2C"
					/>
				</g>
				<g transform={`rotate(${rotations[4]} 250 250)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="225"
						rx="225"
						cy="250"
						cx="250"
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={2}
						ry="10"
						rx="10"
						cy="250"
						cx="25"
						fill="#9046CF"
					/>
				</g>
			</g>
		</Box>
	);
}
