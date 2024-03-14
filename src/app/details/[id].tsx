import { BackButton } from "@/components/BackButton";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ProgressBar } from "@/components/ProgressBar";
import { Transactions } from "@/components/Transactions";
import { mocks } from "@/utils/mocks";
import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";

import type BottomSheetComponent from "@gorhom/bottom-sheet";

const Details = () => {
	const [amount, setAmount] = useState("");

	const bottomSheetRef = useRef<BottomSheetComponent>(null);
	const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
	const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

	return (
		<>
			<View className="flex-1 bg-gray-600 pt-9 pb-4 px-8 gap-7 relative">
				<BackButton />

				<Header title="My Goal" subtitle="EUR 1,000.00 of EUR 5,000.00 saved" />

				<ProgressBar percentage={20} />

				<Transactions transactions={mocks.transactions} />

				<TouchableOpacity
					className="absolute bottom-4 right-4 bg-green-500 rounded-full w-16 h-16 items-center justify-center"
					onPress={handleBottomSheetOpen}
				>
					<MaterialIcons name="add" size={24} color={colors.black} />
				</TouchableOpacity>
			</View>
			<BottomSheet
				ref={bottomSheetRef}
				title="New Goal"
				snapPoints={[0.001, 260]}
				onClose={handleBottomSheetClose}
			>
				<View className="gap-6">
					<TransactionTypeSelector onTypeChange={() => {}} />
					<Input
						placeholder="Amount"
						onChangeText={(text) => setAmount(text)}
						value={amount}
					/>

					<Button label="Create" />
				</View>
			</BottomSheet>
		</>
	);
};

export default Details;
