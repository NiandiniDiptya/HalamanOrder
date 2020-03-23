import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Orders extends Component {
  constructor(){
    super();
    this.state = {
      orders: [],
      id: "",
      id_user: "",
      name_product: "",
      total: "",
      bukti_bayar: "",
      status: "",
      action: "",
      find: "",
      message: ""
    }
    if(!localStorage.getItem("Token")){
      window.location = "/";
    }
  }

  bind = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

  get_order = () => {
    let url = "http://localhost/toko_online/public/orders";
    axios.get(url)
    .then(response => {
      this.setState({orders: response.data.orders});
    })
    .catch(error => {
      console.log(error);
    });
  }

  Accept = (id_order) => {
    if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
      $("#modal_accept").modal("hide");
      let url = "http://localhost/toko_online/public/accept/"+id_order;
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("status", this.state.status);
      axios.post(url, form)
      .then(response => {
        this.get_order();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  Decline = (id_order) => {
    if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
      $("#modal_decline").modal("hide");
      let url = "http://localhost/toko_online/public/decline/"+id_order;
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("status", this.state.status);
      axios.post(url, form)
      .then(response => {
        this.get_order();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentDidMount = () => {
    this.get_order();
  }

  search = (event) => {
    if (event.keyCode === 13) {
      // keyCode 13 = tombol enter
      let url = "http://localhost/toko_online/public/orders";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        this.setState({orders: response.data.orders});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-danger">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Orders</h4>
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" name="find"
                  onChange={this.bind} value={this.state.find}
                  onKeyUp={this.search} placeholder="Pencarian..." />
                </div>
              </div>
            </div>
            {/* content card */}
            <div className="card-body bg-info">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID User</th>
                    <th>Nama Produk</th>
                    <th>Total</th>
                    <th>Bukti Bayar</th>
                    <th>Status</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.orders.map((item) => {
                    return(
                      <tr key={item.id_order}>
                        <td>{item.id_order}</td>
                        <td>{item.name_product}</td>
                        <td>{item.alamat}</td>
                        <td>{item.total}</td>
                        <td>
                        <img src={'http://localhost/toko_online/public/images/' + item.bukti_bayar}
                        alt={item.bukti_bayar} width="150px" height="200px"/>
                        </td>
                        <td>{item.status}</td>

                        <td>
                          {item.detail.map((it) => {
                            return(
                              <ul key={it.id_order}>
                                <li>{it.name} ({it.qty})</li>
                              </ul>
                            )
                          })}
                        </td>

                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Accept(item.id_order)}>
                            <span className="fa fa-check-circle"></span> Accept
                          </button>
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Decline(item.id_order)}>
                            <span className="fa fa-times-circle"></span> Decline
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <Modal id="modal_accept" title="Accept" bg-header="warning" text_header="white">
               <form onSubmit={this.Accept}>
                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                <button type="submit" className="btn btn-dark m-2">
                  <span className="fa fa-check-circle"></span> Save
                </button>
               </form>
              </Modal>

              <Modal id="modal_decline" title="Decline" bg-header="warning" text_header="white">
               <form onSubmit={this.Decline}>
                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                <button type="submit" className="btn btn-dark m-2">
                  <span className="fa fa-check-circle"></span> Save
                </button>
               </form>
              </Modal>
            </div>
          </div>
        </div>
    );
  }
}
