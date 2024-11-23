import React, { MouseEvent, ReactNode } from "react";
import "../css/ExpenseEntryItemList.css";

//Material UI imports

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface Item {
  id: number;
  name: string;
  amount: number;
  spendDate: string;
  category: string;
}

interface ExpenseEntryItemListState {
  items: Item[];
}

class ExpenseEntryItemList extends React.Component<
  any,
  ExpenseEntryItemListState,
  ReactNode
> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: this.props.items,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e: MouseEvent): void {
    ((e.target as HTMLElement).parentNode as HTMLElement).classList.add(
      "highlight",
    ); // (<HTMLElement>(<HTMLElement>e.target).parentNode).classList.add("highlight");
  }

  handleMouseOver(e: MouseEvent): void {
    console.log(`(${e.clientX} and ${e.clientY})`);
  }

  handleMouseLeave(e: MouseEvent): void {
    ((e.target as HTMLElement).parentNode as HTMLElement).classList.remove(
      "highlight",
    );
  }

  handleDelete = (id: number, e: MouseEvent): void => {
    e.preventDefault();
    this.props.onDelete!(id, e);

    this.setState((state: ExpenseEntryItemListState, props: any) => {
      let items: Item[] = [];

      state.items.forEach((item, idx) => {
        if (item.id != id) items.push(item);
      });

      let newState = {
        items: items,
      };

      return newState;
    });
  };

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      total += this.state.items[i].amount;
    }
    return total;
  }

  static getDerivedStateFromProps(
    props: any,
    state: ExpenseEntryItemListState,
  ) {
    let newState = {
      items: props.items,
    };

    return newState;
  }

  render(): ReactNode {
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

    const lists = this.state.items.map((item) => {
      return (
        <StyledTableRow key={item.id}>
          <StyledTableCell component="th" scope="row">
            {item.name}
          </StyledTableCell>
          <StyledTableCell align="right">{item.amount}</StyledTableCell>
          <StyledTableCell align="right">
            {new Date(item.spendDate).toDateString()}
          </StyledTableCell>
          <StyledTableCell align="right">{item.category}</StyledTableCell>
        </StyledTableRow>
      );
    });

    return (
      <TableContainer component={Paper}>
        <Table aria-label="customizedtable">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Spend Date</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{lists}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default ExpenseEntryItemList;
