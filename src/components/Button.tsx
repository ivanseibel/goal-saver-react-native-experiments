import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ComponentProps = TouchableOpacityProps & {
	label: string;
};

export const Button = ({ label, ...props }: ComponentProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="h-12 w-full bg-blue-500 items-center justify-center rounded"
			{...props}
		>
			<Text className="text-white text-sm font-semibold uppercase">
				{label}
			</Text>
		</TouchableOpacity>
	);
};
