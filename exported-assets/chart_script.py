import plotly.graph_objects as go
import plotly.express as px
import pandas as pd

# Define nodes and their positions
nodes = {
    'Herman Blevins': {'x': 0.5, 'y': 3, 'type': 'Owner', 'status': 'Property Owner<br>Status: Unknown', 'symbol': 'circle'},
    'Glenda Blevins': {'x': 1.5, 'y': 3, 'type': 'Owner', 'status': 'Property Owner<br>Died: 12/24/2020', 'symbol': 'circle'},
    'Fulton St Prop': {'x': 1, 'y': 1.5, 'type': 'Property', 'status': 'PPIN: 43387<br>Florence AL<br>0.28 acres<br>Value: $2,400', 'symbol': 'square'},
    'Pamela Williams': {'x': 3, 'y': 1.5, 'type': 'Manager', 'status': 'Property Manager<br>600 Firestone Ave<br>Apt 411<br>Muscle Shoals AL', 'symbol': 'diamond'},
    'Phillip Williams': {'x': 3, 'y': 0, 'type': 'Co-resident', 'status': 'Co-resident<br>Same address<br>as Pamela', 'symbol': 'triangle-up'}
}

# Define connections with labels and positions
connections = [
    ('Herman Blevins', 'Glenda Blevins', 'Married', 1, 3.2),
    ('Herman Blevins', 'Fulton St Prop', 'Co-owns', 0.75, 2.25),
    ('Glenda Blevins', 'Fulton St Prop', 'Co-owns', 1.25, 2.25),
    ('Fulton St Prop', 'Pamela Williams', 'Managed by', 2, 1.7),
    ('Pamela Williams', 'Phillip Williams', 'Lives with', 3.2, 0.75)
]

# Create figure
fig = go.Figure()

# Add connection lines
for conn in connections:
    x0, y0 = nodes[conn[0]]['x'], nodes[conn[0]]['y']
    x1, y1 = nodes[conn[1]]['x'], nodes[conn[1]]['y']
    label_x, label_y = conn[3], conn[4]
    
    # Add line
    fig.add_trace(go.Scatter(
        x=[x0, x1, None],
        y=[y0, y1, None],
        mode='lines',
        line=dict(color='#5D878F', width=3),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Add relationship label with background
    fig.add_trace(go.Scatter(
        x=[label_x],
        y=[label_y],
        mode='text',
        text=conn[2],
        textfont=dict(size=12, color='#13343B'),
        showlegend=False,
        hoverinfo='skip'
    ))

# Color mapping for different entity types
colors = {
    'Owner': '#1FB8CD',
    'Property': '#FFC185', 
    'Manager': '#ECEBD5',
    'Co-resident': '#D2BA4C'
}

symbols = {
    'circle': 'circle',
    'square': 'square',
    'diamond': 'diamond',
    'triangle-up': 'triangle-up'
}

# Add nodes with different shapes
for name, info in nodes.items():
    # Shorten names for display
    if name == 'Herman Blevins':
        display_name = 'Herman<br>Blevins'
    elif name == 'Glenda Blevins':
        display_name = 'Glenda<br>Blevins<br>(†12/24/20)'
    elif name == 'Fulton St Prop':
        display_name = 'Fulton St<br>Property<br>PPIN 43387'
    elif name == 'Pamela Williams':
        display_name = 'Pamela<br>Williams'
    else:
        display_name = 'Phillip<br>Williams'
    
    fig.add_trace(go.Scatter(
        x=[info['x']],
        y=[info['y']],
        mode='markers+text',
        marker=dict(
            size=120,
            color=colors[info['type']],
            symbol=symbols[info['symbol']],
            line=dict(width=3, color='white')
        ),
        text=display_name,
        textposition='middle center',
        textfont=dict(size=10, color='black'),
        name=info['type'],
        hovertemplate=f'<b>{name}</b><br>{info["status"]}<extra></extra>',
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title='Fulton St Property Relationships',
    xaxis=dict(visible=False),
    yaxis=dict(visible=False),
    showlegend=True,
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    plot_bgcolor='white',
    hovermode='closest'
)

fig.update_xaxes(range=[-0.2, 3.7])
fig.update_yaxes(range=[-0.5, 3.7])

# Save the chart
fig.write_image("property_relationships.png")