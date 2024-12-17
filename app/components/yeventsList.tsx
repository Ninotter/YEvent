import { FlatList } from "react-native";
import YEventItemList from "./yeventItemList";
interface YEventsListProps {

    events: YEvent[];
  
    navigation?: any;
  
  }
  
const YEventsList : React.FC<YEventsListProps> = ({events, navigation}) => {
  return <FlatList
              horizontal={true}
              data={events}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <YEventItemList yevent={item} navigation={navigation}></YEventItemList>
              )}
            ></FlatList>
};

export default YEventsList;
