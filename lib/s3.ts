import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  forcePathStyle: true,
  region: "ap-southeast-1",
  endpoint: "https://pyoaowwarxwvraghsvpz.storage.supabase.co/storage/v1/s3",
  credentials: {
    accessKeyId: "0989ec2e9f7903c64be18186da5863dc",
    secretAccessKey: "8d67d7d973475fcd52f47a3b5e1bec0b0697ad7a6658bd9450fed6b9db253c19",
  },
});

export const uploadImageToS3 = async (
  bytes: Uint8Array, 
  originalName: string, 
  contentType: string, 
  bucket: string = "portfolio",
  folder?: string
): Promise<string> => {
  const fileName = `${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
  const key = folder ? `${folder}/${fileName}` : fileName;
  
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: bytes,
    ContentType: contentType,
  });

  await s3Client.send(command);
  
  return `https://pyoaowwarxwvraghsvpz.storage.supabase.co/storage/v1/object/public/${bucket}/${key}`;
};

export const deleteImageFromS3 = async (url: string, bucket: string = "portfolio"): Promise<void> => {
  try {
    const publicUrlPrefix = `https://pyoaowwarxwvraghsvpz.storage.supabase.co/storage/v1/object/public/${bucket}/`;
    if (!url.startsWith(publicUrlPrefix)) {
      return; // Not our bucket or malformed URL
    }
    
    const key = url.replace(publicUrlPrefix, '');
    
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    
    await s3Client.send(command);
    console.log(`Successfully deleted ${key} from S3`);
  } catch (error) {
    console.error(`Failed to delete image from S3:`, error);
  }
};
