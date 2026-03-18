import { useMemo, useState } from 'react'
import { Alert, Button, Card, Table, Typography, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { parseCsvText, type ParsedCsvResult } from '../../services/csv.service'
import { importModuleRows, type AdminImportModule, type ImportResult } from '../../services/admin-import.service'

type CsvImportPanelProps = {
  title: string
  entityLabel: string
  moduleKey: AdminImportModule
}

function CsvImportPanel({ title, entityLabel, moduleKey }: CsvImportPanelProps) {
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
      } else {
        message.warning(`Import xong: ${response.success} thành công, ${response.failed} thất bại`)
      }
    } catch {
      message.error('Upload CSV thất bại. Vui lòng kiểm tra API backend.')
    } finally {
      setIsUploading(false)
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