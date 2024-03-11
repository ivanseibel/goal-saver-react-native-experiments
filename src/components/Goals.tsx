import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native";
import { Goal } from "./Goal";

type ComponentProps = {
	goals: GoalDTO[];
	onPress: (id: string) => void;
	onAdd: () => void;
};

export const Goals = ({ goals, onPress, onAdd }: ComponentProps) => {
	return (
		<ScrollView
			className="mt-11 -mr-8 max-h-[164px]"
			contentContainerClassName="h-[164px] gap-4 pr-8"
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{/* Add button */}
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onAdd}
				className="w-16 items-center justify-center bg-green-500 rounded-lg h-full"
			>
				<MaterialIcons name="add" size={36} color={colors.black} />
			</TouchableOpacity>

			{/* Goals */}
			{goals.map((goal) => (
				<Goal key={goal.id} goal={goal} onPress={() => onPress(goal.id)} />
			))}
		</ScrollView>
	);
};
