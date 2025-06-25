import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = '1920x1080' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Create form data for the Vyro.ai API
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('style', 'realistic')
    formData.append('aspect_ratio', '16:9') // Convert size to aspect ratio
    formData.append('seed', Math.floor(Math.random() * 1000).toString())

    const response = await fetch('https://api.vyro.ai/v2/image/generations', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer vk-CF2wcfm4PgL3g2DQGfwQBgRhi43l6PUlNeAJUVICqoXF0QH',
      },
      body: formData,
    })

    if (!response.ok) {
      // Check if response is JSON (error response)
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        throw new Error(`Image generation failed: ${errorData.message || response.statusText}`)
      } else {
        throw new Error(`Image generation failed: ${response.statusText}`)
      }
    }

    // The API returns binary image data, so we need to convert it to a data URL
    const imageBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString('base64')
    const dataUrl = `data:image/jpeg;base64,${base64Image}`
    
    return NextResponse.json({ 
      image_url: dataUrl,
      success: true 
    })

  } catch (error) {
    console.error('Image generation error:', error)
    
    // Return a fallback response with beautiful placeholder
    return NextResponse.json({ 
      image_url: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      success: false,
      error: 'Failed to generate image, using fallback'
    })
  }
} 