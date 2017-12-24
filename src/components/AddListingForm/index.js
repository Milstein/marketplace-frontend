import React from "react";

import { Form, Text, Select, TextArea } from "react-form";
import { Container, Header, Grid, List } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";

import ListingService from "services/api/listing.js";

const categoryOptions = [
    {
        label: "For sale",
        value: 1
    },
];


export default class AddListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { files: [], maxFilesExceeded: false };
    }

    onDrop(files) {
        if (files.length < 7) {
            this.setState({ files });
        }
        else {
            this.setState({ maxFilesExceeded: true });
            this.setState({ files: [] });
        }
    }

    handleSubmit(submittedVals) {
        this.setState({submittedVals});

        ListingService
            .put(submittedVals)
            .then(res => {
                this.setState({ fireRedirect: true });
            });
    }

    render() {
        var DropzoneMsg; 
        if (this.state.maxFilesExceeded) {
            DropzoneMsg = props => (
                <p>Too many files (6 max). Please select your images again.</p>
            );
        }
        else {
            DropzoneMsg = props => (
                <p>Drop images here, or click to upload.</p>
            );
        }

        const FormContent = props => (
            <form onSubmit={props.formApi.submitForm}>
                <div className="ui input">
                    <Text field="name" id="name" className="ui input" placeholder="Name" />
                </div>
                
                <div className="ui input">
                    <TextArea field="about" id="about" />
                </div>

                <div className="ui input">
                    <Select field="category" id="category" options={categoryOptions} />
                </div>

                <div className="ui input">
                    <Text field="price" id="price" />
                </div>

                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <DropzoneMsg />

                    <List as='ol'>
                        {
                            this.state.files.map(f => 
                                <List.Item as="li" key={f.name}>{f.name} - {f.size} bytes</List.Item>
                            )
                        }
                    </List>
                </Dropzone>

                <button type="submit">Submit</button>
            </form>
        );

        if (this.state.fireRedirect) {
            return (
                <Redirect to="/profile" />
            );
        }
        else {
            return (
                <Form 
                    onSubmit={this.handleSubmit}
                    component={FormContent} />
            );
        }
    }
}