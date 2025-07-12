import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, StatusBar, View } from "react-native";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback, useState } from "react";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Loading } from "@/components/Loading";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import dayjs from "dayjs";
import { colors } from "@/theme";

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionDatabase = useTransactionsDatabase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        }))
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();
    const fetchTransactionPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionPromise]);
    setIsFetching(false);
  }

  function handleTransactionRemove(id: string) {
    Alert.alert("Remover", "Deseja realmente remover?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => transactionRemove(id),
      },
    ]);
  }

  async function transactionRemove(id: string) {
    try {
      await transactionDatabase.remove(Number(id));
      fetchData();
      Alert.alert("Trnasação", "Transação removida com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a transação");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => router.navigate(`/target?id=${params.id}`),
          icon: "edit",
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
