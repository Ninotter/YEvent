import { FlatList } from "react-native";
import YEventeventList from "./yeventItemList";

const YEventsList = ({ events }: { events: Array<YEvent> }) => {
  return <FlatList
              horizontal={true}
              data={events}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <YEventeventList yevent={item}></YEventeventList>
              )}
            ></FlatList>
};

export default YEventsList;
