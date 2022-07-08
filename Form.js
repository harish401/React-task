import React from 'react';
import './style.css';


class Form extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };
    
   

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["name"] = "";
          fields["emailid"] = "";
         
          fields["subject"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }
      var data = {
        email: this.state.fields.emailid,
        name: this.state.fields.name,
        subject:this.state.fields.subject,
      };
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('https://lms.software-demo.in/admin/api/v1/web/contact/save-enquiry', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
  
    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["name"]) {
        formIsValid = false;
        errors["name"] = "*Please enter your username.";
      }

      if (typeof fields["name"] !== "undefined") {
        if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["name"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }

     
     

      this.setState({
        errors: errors
      });
      return formIsValid;


    }



  render() {
      
    return (
    <div id="main-registration-container">
    
         <div id='heading'> <h3>We'd love to hear from you</h3>  </div>
         <div> <hr class="solid"/></div>
         <div> <p  class="line" style={{marginLeft:"20px"}}> Whether you want to try our products or have technical questions - we haveit all covered</p></div>
       
      
     
        <div id="register">
            
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
            <div style={{  display:"flex"}}>
                <div style={{padding:" 5px",
  }}>
        <label>Name</label>
        <input type="text" style={{marginTop:5}} name="name" placeholder='Enter your name' value={this.state.fields.name} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.name}</div>
        </div>
        <div style={{padding: 5,
  marginLeft:20,}}> <label>Email ID:</label>
        <input style={{marginTop:5}}type="text" placeholder='Enter your email ' name="emailid"  value={this.state.fields.emailid} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div></div>
        </div>
        <label >Message type</label>
      
        <input type="text" style={{marginTop:5}} defaultValue="contact a tech geek"  value={this.state.fields.username} onChange={this.handleChange} />
       <div style={{marginTop:10}}><label >Message</label> 
        <textarea id="subject" name="subject"  placeholder='message' style={{height:"100px",width:'105%',marginTop:10 }} value={this.state.fields.subject} onChange={this.handleChange}></textarea> 
        <div className="errorMsg">{this.state.errors.subject}</div>
        </div> 
       
       
       
       
        </form>
        <button type="submit" className="button" style={{float:"right",paddingLeft:20,paddingRight:20,borderRadius:5}}  onClick={this.submituserRegistrationForm}>Send</button>
        
        <div class="col-75">

    </div>
    </div>
</div>

      );
  }


}


export default Form;
