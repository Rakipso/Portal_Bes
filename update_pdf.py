import os
import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

try:
    from docx2pdf import convert
except ImportError:
    install('docx2pdf')
    from docx2pdf import convert

import shutil

docx_path = r"c:\Users\teamf\Downloads\proyecto Portal-bes\portal-migracion\Plan_de_Pruebas_Portal_BES_v1.docx"
pdf_path = r"C:\Users\teamf\OneDrive\Escritorio\documentos portal bes\Plan_de_Pruebas_Portal_BES_v1.docx.pdf"

try:
    print(f"Convirtiendo {docx_path} a PDF...")
    # Usamos docx2pdf que utiliza Microsoft Word de fondo para una conversión perfecta
    convert(docx_path, pdf_path)
    print("PDF actualizado correctamente en la carpeta del escritorio.")
except Exception as e:
    print(f"Fallo docx2pdf, intentando con win32com... Error: {e}")
    try:
        install('pywin32')
        import win32com.client
        word = win32com.client.Dispatch('Word.Application')
        doc = word.Documents.Open(docx_path)
        doc.SaveAs(pdf_path, FileFormat=17)
        doc.Close()
        word.Quit()
        print("PDF actualizado correctamente usando win32com.")
    except Exception as e2:
        print(f"Error fatal convirtiendo a PDF: {e2}")
