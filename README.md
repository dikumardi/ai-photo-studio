# ai-photo-studio
# Image Processing Features

In this project, I have implemented two main features: background removal and background replacement using an uploaded image.

## 1. Background Removal Feature

This feature allows the user to upload an image and automatically remove its background.

### How it works:
- User sends `imageName` and image file
- The system checks:
  - imageName is provided
  - file is uploaded
  - file type is PNG or JPG
- Background is removed using a service
- Processed image is uploaded to ImageKit
- Image URL and name are saved in database

### Response:
- Success message
- Stored image data (URL + name)

---

## 2. Background Replacement Feature

This feature allows the user to replace the background of an image using a prompt.

### How it works:
- User sends:
  - `imageName`
  - `prompt` (like beach, city, etc.)
  - image file
- The system checks:
  - all fields are present
  - file is an image
- Background is replaced using AI service (Clipdrop)
- New image is uploaded to ImageKit
- Image data is saved in database

### Response:
- Success message
- Updated image data

---

## Error Handling

- If imageName is missing → error
- If prompt is missing → error (in replace feature)
- If no file → error
- If wrong file type → error
- If duplicate image name → error
- Other errors → server error message

---

## Tech Used

- Node.js
- Express.js
- ImageKit (for storage)
- UUID (for unique file names)
- Background remove & replace services

---

## Note

- Each image is stored with a unique name using UUID
- Only image files are allowed
- Database stores image URL and name
