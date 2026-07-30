using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Data.Pdf;
using Windows.Storage;
using Windows.Storage.Streams;

class Program
{
    static void Main(string[] args)
    {
        Run().GetAwaiter().GetResult();
    }

    static async Task Run()
    {
        string baseDir = Directory.GetCurrentDirectory();
        string pdfPath = Path.Combine(baseDir, "BAB 1", "pertemuan3.pdf");
        string outDir = Path.Combine(baseDir, "image", "BAB 1", "TP3_slides");

        if (!Directory.Exists(outDir)) Directory.CreateDirectory(outDir);

        StorageFile file = await StorageFile.GetFileFromPathAsync(pdfPath).AsTask();
        PdfDocument pdfDoc = await PdfDocument.LoadFromFileAsync(file).AsTask();
        StorageFolder outFolder = await StorageFolder.GetFolderFromPathAsync(outDir).AsTask();

        Console.WriteLine("Total PDF Pages: " + pdfDoc.PageCount);

        for (uint i = 0; i < pdfDoc.PageCount; i++)
        {
            using (PdfPage page = pdfDoc.GetPage(i))
            using (InMemoryRandomAccessStream stream = new InMemoryRandomAccessStream())
            {
                PdfPageRenderOptions options = new PdfPageRenderOptions();
                options.DestinationWidth = 1920;
                await page.RenderToStreamAsync(stream, options).AsTask();

                string fileName = string.Format("slide_{0}.png", i + 1);
                StorageFile outFile = await outFolder.CreateFileAsync(fileName, CreationCollisionOption.ReplaceExisting).AsTask();

                using (IRandomAccessStream fileStream = await outFile.OpenAsync(FileAccessMode.ReadWrite).AsTask())
                using (DataReader reader = new DataReader(stream.GetInputStreamAt(0)))
                using (DataWriter writer = new DataWriter(fileStream))
                {
                    await reader.LoadAsync((uint)stream.Size).AsTask();
                    IBuffer buffer = reader.ReadBuffer((uint)stream.Size);
                    writer.WriteBuffer(buffer);
                    await writer.StoreAsync().AsTask();
                    await fileStream.FlushAsync().AsTask();
                }
            }
            Console.WriteLine("Saved slide_" + (i + 1) + ".png");
        }
    }
}
