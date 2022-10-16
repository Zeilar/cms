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
				1: rotate(p[1], 0.25),
				2: rotate(p[2], 0.5),
				3: rotate(p[3], 0.75),
				4: rotate(p[4], 1),
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
			xmlns="http://www.w3.org/var(--chakra-colors-whiteAlpha-50)/svg"
			viewBox="0 0 300 300"
			width={150}
			height={150}
			version="1.1"
			xmlSpace="preserve"
		>
			<g>
				<ellipse
					stroke="var(--chakra-colors-whiteAlpha-50)"
					strokeWidth={4}
					ry={25}
					rx={25}
					cy={150}
					cx={150}
					fill="var(--chakra-colors-accent)"
				/>
				<g transform={`rotate(${rotations[1]}, 150, 150)`}>
					<path
						d="m150,275c-69.06077,0 -125,-55.93923 -125,-125c0,-69.06077 55.93923,-125 125,-125c69.06077,0 125,55.93923 125,125c0,69.06077 -55.93923,125 -125,125z"
						strokeWidth={4}
						stroke="var(--chakra-colors-whiteAlpha-50)"
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="11.76754"
						rx="11.76754"
						cy="247.85316"
						cx="73.2963"
						fill="var(--chakra-colors-accent)"
					/>
				</g>
				<g transform={`rotate(${rotations[2]}, 150, 150)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry={100}
						rx={100}
						cy={150}
						cx={150}
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="11.76754"
						rx="11.76754"
						cy="135.72657"
						cx="248.63809"
						fill="var(--chakra-colors-accent)"
					/>
				</g>
				<g transform={`rotate(${rotations[3]}, 150, 150)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry={75}
						rx={75}
						cy={150}
						cx={150}
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="11.76754"
						rx="11.76754"
						cy="206.17284"
						cx="197.67902"
						fill="var(--chakra-colors-accent)"
					/>
				</g>
				<g transform={`rotate(${rotations[4]}, 150, 150)`}>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry={50}
						rx={50}
						cy={150}
						cx={150}
						fill="none"
					/>
					<ellipse
						stroke="var(--chakra-colors-whiteAlpha-50)"
						strokeWidth={4}
						ry="11.76754"
						rx="11.76754"
						cy="115.7817"
						cx="114.49317"
						fill="var(--chakra-colors-accent)"
					/>
				</g>
			</g>
		</Box>
	);
}
