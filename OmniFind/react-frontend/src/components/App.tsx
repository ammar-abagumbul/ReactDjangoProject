// import LoginForm from "./LoginForm";

import Pager from "./Pager";
import ExpenseEntryItemList from "./ExpenseEntryItemList";
const items = [
  {
    id: 1,
    name: "Pizza",
    amount: 80,
    spendDate: "2020-10-10",
    category: "Food",
  },
  {
    id: 2,
    name: "Grape Juice",
    amount: 30,
    spendDate: "2020-10-12",
    category: "Food",
  },
  {
    id: 3,
    name: "Cinema",
    amount: 210,
    spendDate: "2020-10-16",
    category: "Entertainment",
  },
  {
    id: 4,
    name: "Java Programming book",
    amount: 242,
    spendDate: "2020-10-15",
    category: "Academic",
  },
  {
    id: 5,
    name: "Mango Juice",
    amount: 35,
    spendDate: "2020-10-16",
    category: "Food",
  },
  {
    id: 6,
    name: "Dress",
    amount: 2000,
    spendDate: "2020-10-25",
    category: "Cloth",
  },
];

const pageCount = 3;

function App() {
  return (
    <>
      <Pager
        items={items}
        pageCount={pageCount}
        render={(pagerState) => {
          return (
            <div>
              <ExpenseEntryItemList
                items={pagerState.items}
                onDelete={pagerState.deleteHandler}
              />
            </div>
          );
        }}
      />
    </>
  );
}

export default App;
