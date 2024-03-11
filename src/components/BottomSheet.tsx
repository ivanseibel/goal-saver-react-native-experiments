import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheetComponent from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { View, Text } from "react-native";

type ComponentProps = {
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	snapPoints: number[];
};

export const BottomSheet = forwardRef<BottomSheetComponent, ComponentProps>(
	({ onClose, title, children, snapPoints }, ref) => {
		return (
			<BottomSheetComponent
				ref={ref}
				index={0}
				snapPoints={snapPoints}
				handleComponent={() => null}
				backgroundStyle={{
					borderWidth: 1,
					borderColor: colors.gray[400],
					backgroundColor: colors.gray[700],
				}}
			>
				<View className="p-8 gap-4">
					<View className="flex-row">
						<Text className="flex-1 text-white font-semiBold text-base">
							{title}
						</Text>

						<MaterialIcons
							name="close"
							size={24}
							color={colors.gray[300]}
							onPress={onClose}
						/>
					</View>
					{children}
				</View>
			</BottomSheetComponent>
		);
	},
);
