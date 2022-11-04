import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default motion<Omit<BoxProps, "transition">>(Box);
