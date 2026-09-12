from PIL import Image
import os
import glob

directory = 'images/tarot'
files = glob.glob(os.path.join(directory, '*.jpg'))

total_saved = 0

for file in files:
    try:
        orig_size = os.path.getsize(file)
        img = Image.open(file)
        
        # Resize if width > 600 to save space while keeping retina quality
        if img.width > 600:
            ratio = 600.0 / float(img.width)
            new_height = int(float(img.height) * float(ratio))
            img = img.resize((600, new_height), Image.Resampling.LANCZOS)
        
        # Save as WebP
        new_filename = os.path.splitext(file)[0] + '.webp'
        img.save(new_filename, 'webp', optimize=True, quality=80)
        
        new_size = os.path.getsize(new_filename)
        saved = orig_size - new_size
        total_saved += saved
        
        # Remove old jpg
        os.remove(file)
        print(f"Optimized: {os.path.basename(file)} -> saved {saved/1024:.2f} KB")
    except Exception as e:
        print(f"Failed to optimize {file}: {e}")

print(f"Total space saved: {total_saved / (1024*1024):.2f} MB")
