import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { currencyFormat } from "../utils/currencyFormat";

type ComponentProps = TouchableOpacityProps & {
	goal: GoalDTO;
};

export const Goal = ({ goal, ...props }: ComponentProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="bg-gray-500 h-full w-40 rounded-lg p-4"
			{...props}
		>
			<Text className="text-lg font-bold text-white mb-3">{goal.name}</Text>
			<Text className="text-white font-semiBold text-sm">
				{currencyFormat(goal.current)}
			</Text>
			<Text className="text-gray-300 font-regular text-sm flex-1">
				of {currencyFormat(goal.total)}
			</Text>
		</TouchableOpacity>
	);
};
