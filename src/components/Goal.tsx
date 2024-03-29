import {
	TouchableOpacity,
	type TouchableOpacityProps,
	Text,
} from "react-native";
import { formatCurrencyCrossPlatform } from "../utils/formatCurrency";
import { ProgressBar } from "./ProgressBar";

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
				{formatCurrencyCrossPlatform(goal.current)}
			</Text>
			<Text className="text-gray-300 font-regular text-sm flex-1">
				of {formatCurrencyCrossPlatform(goal.total)}
			</Text>

			<ProgressBar percentage={(goal.current / goal.total) * 100} />
		</TouchableOpacity>
	);
};
