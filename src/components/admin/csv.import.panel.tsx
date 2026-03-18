import { useMemo, useState } from 'react'
import { Alert, Button, Card, Table, Typography, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { convertRowsToCsvText, downloadCsvFile, parseCsvText, type ParsedCsvResult } from '../../services/csv.service'
import { importModuleRows, type AdminImportModule, type ImportResult } from '../../services/admin-import.service'

type CsvImportPanelProps = {
  title: string
  entityLabel: string
  moduleKey: AdminImportModule
  exportRows?: Record<string, unknown>[]
  exportFileName?: string
  onImportSuccess?: () => Promise<void> | void
}

const moduleTemplateRows: Record<AdminImportModule, Record<string, string>[]> = {
  books: [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Programming',
      price: '299000',
      quantity: '12',
      thumbnail: 'https://example.com/book.jpg',
      slider: 'https://example.com/book.jpg|https://example.com/book-2.jpg',
      mainText: 'Book description here',
    },
  ],
  orders: [
    {
      name: 'Nguyen Van A',
      address: '1 Nguyen Trai, Ha Noi',
      phone: '0912345678',
      totalPrice: '498000',
      type: 'COD',
      bookId: '65d0f1023456789012345678',
      bookName: 'Clean Code',
      quantity: '1',
    },
  ],
  users: [
    {
      fullName: 'Tran Thi B',
      email: 'tranthib@example.com',
      password: '123456',
      phone: '0987654321',
    },
  ],
}

function CsvImportPanel({
  title,
  entityLabel,
  moduleKey,
  exportRows = [],
  exportFileName,
  onImportSuccess,
}: CsvImportPanelProps) {
  const [result, setResult] = useState<ParsedCsvResult | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  const columns = useMemo<ColumnsType<Record<string, string>>>(() => {
    if (!result) {
      return []
    }

    return result.headers.map((header) => ({
      key: header,
      title: header,
      dataIndex: header,
      ellipsis: true,
    }))
  }, [result])

  const dataSource = useMemo(() => {
    if (!result) {
      return []
    }

    return result.rows.map((row, index) => ({
      ...row,
      key: `${index}-${row[result.headers[0]] ?? ''}`,
    }))
  }, [result])

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.csv',
    maxCount: 1,
    showUploadList: false,
    beforeUpload: async (file) => {
      try {
        const text = await file.text()
        const parsed = parseCsvText(text)

        setResult(parsed)
        setImportResult(null)
        message.success(`Đã nhận ${parsed.rows.length} ${entityLabel} từ CSV`)
      } catch (error) {
        setResult(null)
        setImportResult(null)
        const errorMessage = error instanceof Error ? error.message : 'Không thể đọc file CSV'
        message.error(errorMessage)
      }

      return false
    },
  }

  const handleUploadToServer = async () => {
    if (!result) {
      return
    }

    try {
      setIsUploading(true)
      const response = await importModuleRows(moduleKey, result.rows)
      setImportResult(response)

      if (response.failed === 0) {
        message.success(`Đã import ${response.success}/${response.total} ${entityLabel} lên hệ thống`)
        await onImportSuccess?.()
      } else {
        message.warning(`Import xong: ${response.success} thành công, ${response.failed} thất bại`)
      }
    } catch {
      message.error('Upload CSV thất bại. Vui lòng kiểm tra API backend.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleExportTemplate = () => {
    try {
      const templateRows = moduleTemplateRows[moduleKey]
      const csvText = convertRowsToCsvText(templateRows)

      downloadCsvFile(`${moduleKey}-template.csv`, csvText)
      message.success('Đã xuất file CSV mẫu')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xuất CSV mẫu thất bại'
      message.error(errorMessage)
    }
  }

  const handleExportCurrentData = () => {
    try {
      const csvText = convertRowsToCsvText(exportRows)

      downloadCsvFile(exportFileName ?? `${moduleKey}-data.csv`, csvText)
      message.success(`Đã xuất ${exportRows.length} ${entityLabel} ra CSV`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Xuất CSV thất bại'
      message.error(errorMessage)
    }
  }

  return (
    <Card style={{ marginBottom: 16 }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>

      <Upload.Dragger {...uploadProps}>
        <Typography.Text strong>Kéo thả file CSV vào đây hoặc bấm để chọn file</Typography.Text>
        <br />
        <Typography.Text type="secondary">Hỗ trợ định dạng: .csv</Typography.Text>
      </Upload.Dragger>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Button onClick={handleExportTemplate}>Tải CSV mẫu</Button>
        <Button onClick={handleExportCurrentData} disabled={exportRows.length === 0}>
          Xuất dữ liệu hiện tại
        </Button>
        <Button type="primary" onClick={handleUploadToServer} loading={isUploading} disabled={!result}>
          Upload lên server
        </Button>
      </div>

      {result && (
        <>
          <Alert
            style={{ marginTop: 12 }}
            type="success"
            message={`Đã nhận ${result.rows.length} ${entityLabel}`}
            description={`Cột nhận được: ${result.headers.join(', ')}`}
            showIcon
          />
          <Table
            style={{ marginTop: 12 }}
            size="small"
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />

          {importResult && (
            <Alert
              style={{ marginTop: 12 }}
              type={importResult.failed === 0 ? 'success' : 'warning'}
              message={`Kết quả import: ${importResult.success}/${importResult.total} thành công`}
              description={
                importResult.errors.length > 0
                  ? importResult.errors.slice(0, 5).join(' | ')
                  : 'Không có lỗi import'
              }
              showIcon
            />
          )}
        </>
      )}
    </Card>
  )
}

export default CsvImportPanel