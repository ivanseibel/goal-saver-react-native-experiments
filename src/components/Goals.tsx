import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native";

type ComponentProps = {
	goals: GoalDTO[];
	onPress: (id: string) => void;
	onAdd: () => void;
};

export const Goals = ({ goals, onPress, onAdd }: ComponentProps) => {
	return (
		<ScrollView className="mt-11" contentContainerClassName="h-[164px] gap-4">
			{/* Add button */}
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onAdd}
				className="w-16 items-center justify-center bg-green-500 rounded-lg h-full"
			>
				<MaterialIcons name="add" size={36} color={colors.black} />
			</TouchableOpacity>
		</ScrollView>
	);
};
