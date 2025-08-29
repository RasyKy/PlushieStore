"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ImageUpload = forwardRef(
  (
    {
      onImageUpload,
      onImagesChange,
      productId = null,
      initialImages = [],
      currentMainImageUrl = "",
    },
    ref
  ) => {
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    useEffect(() => {
      if (initialImages && initialImages.length > 0 && images.length === 0) {
        setImages(initialImages);

        // Find which image matches the current main image URL
        let mainIndex = 0;
        if (currentMainImageUrl) {
          const foundIndex = initialImages.findIndex(
            (img) => img.url === currentMainImageUrl
          );
          if (foundIndex !== -1) {
            mainIndex = foundIndex;
          }
        }

        setMainImageIndex(mainIndex);

        // Set main image and update parent
        if (onImageUpload && typeof onImageUpload === "function") {
          onImageUpload(
            initialImages[mainIndex]?.url ||
              initialImages[mainIndex]?.previewUrl ||
              ""
          );
        }
      }
    }, [initialImages]);

    ImageUpload.displayName = "ImageUpload";
    
    const onDrop = useCallback(
      async (acceptedFiles) => {
        if (images.length + acceptedFiles.length > 5) {
          alert("Maximum 5 images allowed per product");
          return;
        }

        const newImages = [];

        for (const file of acceptedFiles) {
          // Store file locally with preview URL
          const previewUrl = URL.createObjectURL(file);
          newImages.push({
            file: file,
            previewUrl: previewUrl,
            name: file.name,
            isLocal: true,
          });
        }

        if (newImages.length > 0) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);

          // Update parent with images array and main image
          const newMainIndex = images.length === 0 ? 0 : mainImageIndex;
          if (onImagesChange && typeof onImagesChange === "function") {
            onImagesChange(updatedImages);
          }
          if (onImageUpload && typeof onImageUpload === "function") {
            onImageUpload(
              updatedImages[newMainIndex]?.previewUrl ||
                updatedImages[newMainIndex]?.url ||
                ""
            );
          }
        }
      },
      [images, mainImageIndex, onImageUpload, onImagesChange]
    );

    const removeImage = (index) => {
      const imageToRemove = images[index];

      // Clean up preview URL if it's a local file
      if (imageToRemove.isLocal && imageToRemove.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);

      // Adjust main image index if necessary
      let newMainIndex = mainImageIndex;
      if (index === mainImageIndex) {
        newMainIndex = 0;
      } else if (index < mainImageIndex) {
        newMainIndex = mainImageIndex - 1;
      }
      setMainImageIndex(newMainIndex);

      // Update parent
      if (onImagesChange && typeof onImagesChange === "function") {
        onImagesChange(updatedImages);
      }
      const mainImage = updatedImages[newMainIndex];
      if (onImageUpload && typeof onImageUpload === "function") {
        onImageUpload(mainImage?.previewUrl || mainImage?.url || "");
      }
    };

    const setMainImage = (index) => {
      setMainImageIndex(index);

      // Update parent
      const mainImage = images[index];
      if (onImageUpload && typeof onImageUpload === "function") {
        onImageUpload(mainImage?.previewUrl || mainImage?.url || "");
      }
    };

    // Function to upload all images to Supabase (called from parent)
    const uploadToSupabase = async () => {
      const uploadedUrls = [];

      for (const image of images) {
        if (image.isLocal) {
          try {
            // Upload to Supabase Storage
            const fileExt = image.file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random()
              .toString(36)
              .substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
              .from("products")
              .upload(filePath, image.file);

            if (error) throw error;

            // Get public URL
            const {
              data: { publicUrl },
            } = supabase.storage.from("products").getPublicUrl(filePath);

            uploadedUrls.push(publicUrl);
          } catch (error) {
            console.error("Error uploading file:", error);
            throw new Error(`Failed to upload ${image.name}: ${error.message}`);
          }
        } else {
          // Already uploaded image
          uploadedUrls.push(image.url);
        }
      }

      return {
        imageUrls: uploadedUrls,
        mainImageUrl: uploadedUrls[mainImageIndex] || "",
      };
    };

    // Expose upload function and main image index to parent via ref
    useImperativeHandle(ref, () => ({
      uploadToSupabase,
      getMainImageIndex: () => mainImageIndex,
    }));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      maxSize: 10 * 1024 * 1024, // 10MB
      disabled: images.length >= 5,
    });

    return (
      <div className="space-y-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${
            images.length >= 5
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-gray-400"
          }
        `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div>
              {images.length >= 5 ? (
                <p className="text-sm text-gray-500">
                  Maximum 5 images reached
                </p>
              ) : isDragActive ? (
                <p className="text-sm text-gray-500">Drop the images here...</p>
              ) : (
                <div>
                  <p className="text-sm text-gray-500">
                    Drag images here or{" "}
                    <span className="text-blue-500 underline">
                      click to upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPEG, PNG, WebP • Max 10MB • Up to 5 images • Will upload
                    when you save
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative group rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                  ${
                    index === mainImageIndex
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                  onClick={() => setMainImage(index)}
                >
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>

                  {/* Main image indicator */}
                  {index === mainImageIndex && (
                    <div className="absolute top-1 left-1 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}

                  {/* Local file indicator */}
                  {image.isLocal && (
                    <div className="absolute bottom-1 left-1 z-10 bg-orange-500 text-white text-xs px-1 py-0.5 rounded">
                      Local
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={image.previewUrl || image.url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 group-hover:bg-black/30 group-hover:bg-opacity-10 transition-all flex items-end justify-center">
                    {index !== mainImageIndex && (
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-2 py-1 rounded">
                        Set as main
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {images.length > 0 && (
          <p className="text-xs text-gray-500">
            Click on an image to set it as the main product image. Images will
            be uploaded when you save the product.
          </p>
        )}
      </div>
    );
  }
);

export default ImageUpload;
