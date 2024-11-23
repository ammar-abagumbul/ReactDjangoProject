import React, { MouseEvent, ReactNode } from "react";
import "../css/Pager.css";
// Interfaces and type declarations
//
interface defaultProps {
  items: {
    id: number;
    name: string;
    amount: number;
    spendDate: string;
    category: string;
  }[];
  pageCount: number;
  render: (propsTopass: any) => ReactNode;
}

// type anyObj = { [key: string]: any };

// export class Pager extends React.Component< { items: Array<object>; pageCount: number }, {} > {

//                  React.Component<Prop type, state type, render return type>
class Pager extends React.Component<defaultProps, any, ReactNode> {
  constructor(props: defaultProps) {
    super(props);

    this.state = {
      items: this.props.items,
      pageCount: this.props.pageCount,
    };

    this.state = this.calculate(this.state, 1);
  }

  calculate(state: any, pageNo: number) {
    let currentPage = pageNo;
    let totalPages = Math.ceil(state.items.length / state.pageCount);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    // let hasNextPage = currentPage === totalPages ? false : true;
    // let hasPrevPage = currentPage === 1 ? false : true;
    let first = (currentPage - 1) * state.pageCount;
    let last = first + state.pageCount;

    let filteredItems = state.items.slice(first, last);

    let newState = {
      items: state.items,
      filteredItems: filteredItems,
      currentPage: currentPage,
      totalPages: totalPages,
      pageCount: state.pageCount,
    };

    return newState;
  }

  handleClick(pageNo: number, e: MouseEvent) {
    e.preventDefault();
    this.setState((state: any) => {
      return this.calculate(state, pageNo);
    });
  }

  handleDelete = (id: number, e: MouseEvent) => {
    e.preventDefault();
    console.log(id);
    this.setState((state: defaultProps) => {
      let items: object[] = [];
      state.items.forEach((item: any, idx: number) => {
        if (item.id !== idx) {
          items.push(item);
        }
      });

      let newState = {
        items: items,
      };
      return newState;
    });
    this.setState((state: any) => {
      return this.calculate(state, this.state.currentPage);
    });
  };

  render(): ReactNode {
    let pageArray = new Array<number>();
    console.log(`DEBUG ${this.state.totalPages}`);
    for (let i = 1; i <= this.state.totalPages; i++) {
      pageArray.push(i);
    }

    const pages = pageArray.map((idx) => {
      return (
        <a
          href="#"
          key={idx}
          onClick={this.handleClick.bind(this, idx)}
          className={idx == this.state.currentPage ? "is-active" : ""}
        >
          <li>{idx}</li>
        </a>
      );
    });

    let propsTopass = {
      items: this.state.filteredItems,
      deleteHandler: this.handleDelete,
    };

    return (
      <>
        {this.props.render(propsTopass)}
        <div style={{ width: "100%", margin: 0 }}>
          <div className="container">
            <div className="pagination p1">
              <ul>
                {this.state.currentPage != 1 ? (
                  <a
                    href="#"
                    onClick={this.handleClick.bind(
                      this,
                      this.state.currentPage - 1,
                    )}
                  >
                    <li>&lt;</li>
                  </a>
                ) : (
                  <span>&nbsp;</span>
                )}
                {pages}
                {this.state.currentPage != this.state.totalPages ? (
                  <a
                    href="#"
                    onClick={this.handleClick.bind(
                      this,
                      this.state.currentPage + 1,
                    )}
                  >
                    <li>&gt;</li>
                  </a>
                ) : (
                  <span>&nbsp;</span>
                )}
              </ul>
            </div>
            {/* <span>{this.state.currentPage}</span> */}
          </div>
        </div>
      </>
    );
  }
}

export default Pager;
