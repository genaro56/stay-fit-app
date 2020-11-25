import React, { useState } from 'react';
import { Error } from '@material-ui/icons';
import { Container} from '@material-ui/core';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ActivitiesCollection } from '../../firestoreCollections';

function formIsValid(errors: any) {
  return Object.entries(errors).length === 0
}

const getYoutubeVideoId = (url: string) => {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const UploadActivity = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const [categoryValue, setCategoryValue] = useState('yoga');
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function youtube_parser(url: string) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match) {
      return true
    }
    return false
  }

  const handleFormValues = (values: any) => {
    const videoId = getYoutubeVideoId(values.video_url);
    if (videoId) {
      const parsedURL = `https://www.youtube.com/embed/${videoId}`;
      const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      setIsUploading(true)
      ActivitiesCollection.add({
        ...values, video_url: parsedURL, thumbnail: videoThumbnail, likes: 0, views: 0,
      }).then((res) => {
        setSuccess(true)
      }).catch((err: any) => {
        alert("There was an error uploading this: " + err)
      })
      setIsUploading(false)
    } else {
      alert("Could not upload video, wrong url format.");
    }
    // Activity
  }
  return (
    <Container maxWidth="md" style={{ padding: '32px' }}>
      <Row>
        <Col md={8}>
          <h1 className="mb-3">Upload your own activity to the catalog.</h1>
          <Form style={{ width: '' }} onSubmit={handleSubmit(handleFormValues)}>
            <Form.Group>
              <Form.Label>Activity name</Form.Label>
              <Form.Control placeholder="Ex. My exercise workout" name="name" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control value={categoryValue} onChange={(e: any) => setCategoryValue(e.target.value)} as="select" placeholder="The description of the activity" name="category" ref={register({ required: true })}>
                <option value="push-ups"> Push-ups</option>
                <option value="yoga"> Yoga</option>
                <option value="weights"> Weights</option>
                <option value="cardio"> Cardio</option>
                <option value="pilates"> Pilates</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Video-url (ex. https://www.youtube.com/embed/:id)</Form.Label>
              <Form.Control
                placeholder="Url of the video"
                name="video_url"
                ref={register({
                  required: true,
                  validate: youtube_parser,
                })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control placeholder="The description of the activity" name="description" ref={register({ required: true })} />
            </Form.Group>
            <Button disabled={!formIsValid(errors) && !isUploading} type="submit">Submit activity</Button>
            {Object.keys(errors).map((err: any) => (

              <Error>{err}</Error>
            ))}
            {success && <Alert variant="success">Activity successfully uploaded!</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UploadActivity;
