import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

/**
 * WordPress API route handler for posts
 * Supports pagination, search, sorting, and filtering by category/tag
 */
export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;

    // Extract all query parameters with defaults
    const page = Number.parseInt(searchParams.get('page') || '1', 10);
    const perPage = Number.parseInt(searchParams.get('per_page') || '10', 10);
    const search = searchParams.get('search') || '';
    const orderby = searchParams.get('orderby') || 'date';
    const order = searchParams.get('order') || 'desc';
    const categories = searchParams.get('categories') || '';
    const tags = searchParams.get('tags') || '';

    // Build WordPress API URL with all parameters
    const apiParams = new URLSearchParams();
    apiParams.append('_embed', 'true'); // Always include embedded data
    apiParams.append('per_page', perPage.toString());
    apiParams.append('page', page.toString());
    apiParams.append('orderby', orderby);
    apiParams.append('order', order);

    // Only add optional parameters if they exist
    if (search) apiParams.append('search', search);
    if (categories) apiParams.append('categories', categories);
    if (tags) apiParams.append('tags', tags);

    // Make a single API call with all parameters
    const postsUrl = `/wp-json/wp/v2/posts?${apiParams.toString()}`;
    const response = await fetchFn('GET', postsUrl);

    // Check for errors in the response
    if (!response.data) {
      console.error('WordPress API error: ', 'Unknown error');
      return NextResponse.json({ error: 'Error fetching posts from WordPress' }, { status: 500 });
    }

    // Extract headers for pagination
    const totalCount = Number.parseInt(response.headers?.['x-wp-total'] || '0', 10);
    const totalPages = Number.parseInt(response.headers?.['x-wp-totalpages'] || '0', 10);

    // If no posts found but no error occurred
    if (totalCount === 0) {
      return NextResponse.json(
        {
          message: `No posts found`,
          count: 0,
          currentPage: page,
          perPage,
          totalPages: 0,
          posts: [],
        },
        { status: 200 },
      );
    }

    // Return successful response with all data
    return NextResponse.json(
      {
        count: totalCount,
        currentPage: page,
        perPage,
        totalPages,
        posts: response.data,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300', // Cache for 1 minute, stale for 5
        },
      },
    );
  } catch (error: any) {
    // Enhanced error logging
    console.error('Error in posts API route:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
    });

    // Return appropriate error response
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}

/**
 * Define which HTTP methods are allowed for this route
 */
export const OPTIONS = async () => {
  return NextResponse.json(
    {},
    {
      headers: {
        Allow: 'GET, OPTIONS',
      },
    },
  );
};
