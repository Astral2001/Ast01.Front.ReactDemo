// Hooks
import { useEffect, useState } from "react";

// Components
import { Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { postCreatedUser } from "../../services/UserService";

const NewUserModals = ( props ) => {
    const { isShow, handleShow } = props
    const [ name, setName ] = useState('')
    const [ job, setJob ] = useState('')
    const [ isRequired, setIsRequired ] = useState(false);

    // Check required fields
    useEffect(() => {
        if (name && job) {
            setIsRequired(true);
        } else {
            setIsRequired(false);
        }
    }, [name, job]);

    // Methods
    const handleSaveUser = async () => {
        if (!isRequired) {
            toast.error('All fields are required!')
        } else {
            let res = await postCreatedUser({ name, job });

            if (res && res.id) {
                cleanAllFields();
                toast.success('User is created successfully!');
            } else {
                toast.error('Something went wrong!');
            }

            // Refresh modal to create user continuously
            // Not refresh when any field is empty
            refreshModal();
        }
    }

    // Serve for methods
    const cleanAllFields = () => {
        setName('');
        setJob('');
    }

    const refreshModal = () => {
        handleShow(false);
        setTimeout(() => {
            handleShow(true);
        }, 200);
    }

    const handleCancel = () => {
        handleShow()
    }

    return (
        <div className="add-new-container">
            <Modal show={isShow} onHide={handleShow} className="">
                <Modal.Header closeButton>
                    <Modal.Title>New user</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-3 my-2">
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label htmlFor="input-name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                id="input-name"
                                onChange={ ( event ) => setName(event.target.value)}
                            />

                            <label htmlFor="input-job" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="input-job"
                                onChange={ ( event ) => setJob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewUserModals